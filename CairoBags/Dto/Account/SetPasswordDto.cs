using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account
{
    public class SetPasswordDto
    {
        [Required]
        public string NewPassword { get; set; } = string.Empty;
    }
}

