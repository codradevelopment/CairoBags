namespace CairoBags.Dto.Account
{
    public class UpdateMyProfileDto
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ProfileImageUrl { get; set; }
        public object? NotificationSettings { get; set; }
    }
}


