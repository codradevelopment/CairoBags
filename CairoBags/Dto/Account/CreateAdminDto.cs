using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account
{
    public class CreateAdminDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string? FullName { get; set; }
    }
}
