using Google.Apis.Auth;

namespace CairoBags.Service;

public sealed record GoogleValidatedUser(string Email, bool EmailVerified, string? Name, string? Picture);

/// <summary>
/// التحقق من Google ID token — Scoped + MemoryCache (بدون Semaphore/static لتفادي تعليق أو تعارض مع طلبات متزامنة).
/// </summary>
public class GoogleSignInService
{
    private readonly ILogger<GoogleSignInService> _logger;

    public GoogleSignInService(ILogger<GoogleSignInService> logger)
    {
        _logger = logger;
    }

    public async Task<GoogleValidatedUser?> ValidateIdTokenAsync(string idToken, string clientId, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(idToken) || string.IsNullOrWhiteSpace(clientId))
            return null;

        try
        {
            // Google Identity Services returns an ID token (JWT). Validate it against your Web Client ID (audience).
            var payload = await GoogleJsonWebSignature.ValidateAsync(
                idToken,
                new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { clientId },
                });

            if (payload == null)
                return null;

            if (string.IsNullOrWhiteSpace(payload.Email))
                return null;

            return new GoogleValidatedUser(
                payload.Email.Trim(),
                payload.EmailVerified,
                payload.Name,
                payload.Picture);
        }
        catch (Exception ex)
        {
            // Common reasons:
            // - Wrong Audience (frontend/back use different client ids)
            // - Token is not an ID token (access token), or is malformed
            // - Token expired / clock skew issues
            _logger.LogInformation(ex, "Google ID token validation failed (GoogleJsonWebSignature).");
            return null;
        }
    }
}

