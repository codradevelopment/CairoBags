using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account
{
    public class UpdateUsernameDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;
    }
}

