using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account;

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;

    [Required]
    [MinLength(9)]
    public string NewPassword { get; set; } = string.Empty;
}

