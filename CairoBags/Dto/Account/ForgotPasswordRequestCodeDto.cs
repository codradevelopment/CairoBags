using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account;

public class ForgotPasswordRequestCodeDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}

