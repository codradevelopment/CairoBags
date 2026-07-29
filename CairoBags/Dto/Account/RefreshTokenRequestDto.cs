namespace CairoBags.Dto.Account
{
    public class RefreshTokenRequestDto
    {
        /// <summary>Optional when refresh token is sent via HttpOnly cookie.</summary>
        public string? RefreshToken { get; set; }
    }
}

