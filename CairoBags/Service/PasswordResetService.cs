using System.Security.Cryptography;
using System.Text;
using CairoBags.Data;
using CairoBags.Models;
using CairoBags.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CairoBags.Service;

public class PasswordResetService
{
    private readonly CairoBagsContext _db;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEmailService _email;
    private readonly IConfiguration _config;
    private readonly ILogger<PasswordResetService> _logger;

    public PasswordResetService(
        CairoBagsContext db,
        UserManager<ApplicationUser> userManager,
        IEmailService email,
        IConfiguration config,
        ILogger<PasswordResetService> logger)
    {
        _db = db;
        _userManager = userManager;
        _email = email;
        _config = config;
        _logger = logger;
    }

    private string Pepper => _config["PasswordReset:Pepper"] ?? "change-me-in-production";

    private static string HashCode(string pepper, string normalizedEmail, string code)
    {
        var payload = $"{pepper}|{normalizedEmail}|{code.Trim()}";
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(payload));
        return Convert.ToBase64String(bytes);
    }

    /// <summary>
    /// Sends a 6-digit code if the user exists. Caller should always show a generic success (no email enumeration).
    /// </summary>
    public async Task RequestCodeAsync(string email, CancellationToken cancellationToken = default)
    {
        var trimmed = email.Trim();
        var normalized = _userManager.NormalizeEmail(trimmed);
        if (string.IsNullOrEmpty(normalized)) return;

        var user = await _userManager.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.NormalizedEmail == normalized, cancellationToken)
            .ConfigureAwait(false);
        if (user == null) return;

        var code = RandomNumberGenerator.GetInt32(0, 1_000_000).ToString("D6");
        var hash = HashCode(Pepper, normalized, code);
        var now = DateTime.UtcNow;
        var expiryMinutes = 15;
        if (int.TryParse(_config["PasswordReset:ExpiryMinutes"], out var m) && m is >= 5 and <= 60)
            expiryMinutes = m;

        var existing = await _db.PasswordResetOtps
            .Where(r => r.NormalizedEmail == normalized)
            .ToListAsync(cancellationToken)
            .ConfigureAwait(false);
        if (existing.Count > 0)
        {
            _db.PasswordResetOtps.RemoveRange(existing);
            await _db.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }

        _db.PasswordResetOtps.Add(new PasswordResetOtp
        {
            NormalizedEmail = normalized,
            CodeHash = hash,
            ExpiresUtc = now.AddMinutes(expiryMinutes),
            CreatedUtc = now,
        });
        await _db.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        try
        {
            var to = user.Email ?? trimmed;
            var baseUrl = (_config["App:FrontendBaseUrl"] ?? "").Trim().TrimEnd('/');
            var resetUrl = string.IsNullOrEmpty(baseUrl)
                ? "http://localhost:3000/forgot-password"
                : $"{baseUrl}/forgot-password";
            var displayName = user.UserName ?? user.Email ?? "there";
            var (subject, body) = CairoBagsEmailTemplates.BuildPasswordResetCodeEmail(
                displayName,
                code,
                expiryMinutes,
                resetUrl);
            await _email.SendAsync(to, subject, body).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send password reset email to {Email}", user.Email);
        }
    }

    public sealed class CompleteResult
    {
        public bool Ok { get; init; }
        public string? Message { get; init; }
        public string? MessageAr { get; init; }
    }

    public async Task<CompleteResult> TryCompleteAsync(string email, string code, string newPassword, CancellationToken cancellationToken = default)
    {
        var trimmed = email.Trim();
        var normalized = _userManager.NormalizeEmail(trimmed);
        if (string.IsNullOrEmpty(normalized))
            return new CompleteResult { Message = "Invalid email.", MessageAr = "البريد غير صالح." };

        var cleanCode = (code ?? string.Empty).Trim().Replace(" ", string.Empty, StringComparison.Ordinal);
        if (cleanCode.Length is < 4 or > 12)
            return new CompleteResult { Message = "Invalid code.", MessageAr = "رمز التحقق غير صالح." };

        var expectedHash = HashCode(Pepper, normalized, cleanCode);
        var now = DateTime.UtcNow;

        var rowOk = await _db.PasswordResetOtps.AsNoTracking()
            .AnyAsync(
                r => r.NormalizedEmail == normalized && r.CodeHash == expectedHash && r.ExpiresUtc > now,
                cancellationToken)
            .ConfigureAwait(false);

        if (!rowOk)
        {
            return new CompleteResult
            {
                Message = "Invalid or expired code. Request a new code.",
                MessageAr = "الرمز غير صحيح أو منتهي. اطلب رمزًا جديدًا.",
            };
        }

        // Avoid FindByEmailAsync: it uses SingleOrDefault and throws if duplicate emails exist in DB.
        var user = await _userManager.Users
            .Where(u => u.NormalizedEmail == normalized)
            .OrderBy(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken)
            .ConfigureAwait(false);
        if (user == null)
            return new CompleteResult { Message = "User not found.", MessageAr = "المستخدم غير موجود." };

        if (await _userManager.HasPasswordAsync(user).ConfigureAwait(false))
        {
            if (await _userManager.CheckPasswordAsync(user, newPassword).ConfigureAwait(false))
            {
                return new CompleteResult
                {
                    Message = "The new password must be different from your current password.",
                    MessageAr = "أنت مستخدمها قبل كدا — اختر كلمة مرور مختلفة.",
                };
            }

            // Do not use ResetPasswordAsync here: with duplicate NormalizedEmail rows, Identity may run
            // SingleOrDefault on email internally and throw. OTP already proves mailbox control.
            foreach (var validator in _userManager.PasswordValidators)
            {
                var pwdOk = await validator.ValidateAsync(_userManager, user, newPassword).ConfigureAwait(false);
                if (!pwdOk.Succeeded)
                {
                    var first = pwdOk.Errors.FirstOrDefault()?.Description ?? "Invalid password.";
                    return new CompleteResult { Message = first, MessageAr = first };
                }
            }

            var remove = await _userManager.RemovePasswordAsync(user).ConfigureAwait(false);
            if (!remove.Succeeded)
            {
                var first = remove.Errors.FirstOrDefault()?.Description ?? "Could not clear old password.";
                return new CompleteResult { Message = first, MessageAr = first };
            }

            var add = await _userManager.AddPasswordAsync(user, newPassword).ConfigureAwait(false);
            if (!add.Succeeded)
            {
                var first = add.Errors.FirstOrDefault()?.Description ?? "Could not set new password.";
                return new CompleteResult { Message = first, MessageAr = first };
            }
        }
        else
        {
            var add = await _userManager.AddPasswordAsync(user, newPassword).ConfigureAwait(false);
            if (!add.Succeeded)
            {
                var first = add.Errors.FirstOrDefault()?.Description ?? "Could not set password.";
                return new CompleteResult { Message = first, MessageAr = first };
            }
        }

        await _db.PasswordResetOtps
            .Where(r => r.NormalizedEmail == normalized)
            .ExecuteDeleteAsync(cancellationToken)
            .ConfigureAwait(false);

        user.MustChangePassword = false;
        user.RefreshToken = null;
        user.RefreshTokenExpiresUtc = null;
        await _userManager.UpdateAsync(user).ConfigureAwait(false);

        return new CompleteResult { Ok = true };
    }
}

