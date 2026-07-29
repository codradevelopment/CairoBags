using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Account;

public class RegisterDto
{
    public required string UserName { get; set; }

    public required string Password { get; set; }

    [EmailAddress]
    public required string Email { get; set; }

    public required string PhoneNumber { get; set; }
}
