using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account;

public class ForgotPasswordCompleteDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(12, MinimumLength = 4)]
    public string Code { get; set; } = string.Empty;

    [Required]
    [MinLength(9)]
    public string NewPassword { get; set; } = string.Empty;
}

