namespace CairoBags.Dto.Account;

/// <summary>Auth/session response for Cairo Bags (trimmed in Phase 1 cleanup).</summary>
public class NewUserDto
{
    public string? Id { get; set; }
    public string? UserName { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string Token { get; set; } = string.Empty;
    public string? RefreshToken { get; set; }
    public IList<string>? Role { get; set; }
    public bool MustChangePassword { get; set; }
    public string? AuthProvider { get; set; }
    public bool HasPassword { get; set; }
    public bool IsFirstLogin { get; set; }
    public bool IsGoogleUser { get; set; }
    public object? NotificationSettings { get; set; }
}
