using Newtonsoft.Json;

namespace CairoBags.Dto.Account
{
    public class GoogleLoginDto
    {
        /// <summary>Preferred: JWT ID token from Google Identity Services (credentialResponse.credential).</summary>
        [JsonProperty("token")]
        public string? Token { get; set; }

        /// <summary>Backward compatibility: older clients may send "idToken".</summary>
        [JsonProperty("idToken")]
        public string? IdToken { get; set; }
    }
}

