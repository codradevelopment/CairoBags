namespace CairoBags.Models;

/// <summary>One-time email code for forgot-password flow. Hashed code only; plaintext never stored.</summary>
public class PasswordResetOtp
{
    public int Id { get; set; }

    /// <summary>Upper invariant email from Identity normalization.</summary>
    public string NormalizedEmail { get; set; } = string.Empty;

    public string CodeHash { get; set; } = string.Empty;

    public DateTime ExpiresUtc { get; set; }

    public DateTime CreatedUtc { get; set; }
}

