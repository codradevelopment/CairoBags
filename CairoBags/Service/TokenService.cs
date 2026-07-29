using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CairoBags.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace CairoBags.Service
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey? _Key;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<TokenService> _logger;

        public TokenService(IConfiguration configuration, UserManager<ApplicationUser> userManager, ILogger<TokenService> logger)
        {
            _userManager = userManager;
            _config = configuration;
            _logger = logger;

            var signingKey = _config["JWT:SigningKey"];
            if (string.IsNullOrWhiteSpace(signingKey))
            {
                // Do not throw in constructor (would break controller activation and can look like "server crashed").
                _logger.LogError("JWT signing key is missing. Set config value JWT:SigningKey.");
                _Key = null;
                return;
            }

            _Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        }

        public async  Task<string> CreateToken(ApplicationUser customer) {

            if (_Key == null)
                throw new InvalidOperationException("JWT signing key is not configured (JWT:SigningKey).");

            var roles = await _userManager.GetRolesAsync(customer);
            var role = roles.FirstOrDefault();
            if (string.IsNullOrEmpty(role))
                role = "Customer";

            var sub = customer.Id ?? string.Empty;
            var display = customer.UserName ?? customer.Email ?? sub;
            var email = customer.Email ?? string.Empty;

            var claims = new List<Claim> {
            new Claim(ClaimTypes.NameIdentifier, sub),
            new  Claim(JwtRegisteredClaimNames.Sub, sub),
            new  Claim(JwtRegisteredClaimNames.GivenName, display),
            new  Claim(JwtRegisteredClaimNames.Email, email),
            new  Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, role)
            };
            if (customer.MustChangePassword)
                claims.Add(new Claim("must_change_password", "true"));
           

            var accessMinutes = _config.GetValue("JWT:AccessTokenMinutes", 60);
            if (accessMinutes < 5) accessMinutes = 5;
            if (accessMinutes > 60 * 24 * 30) accessMinutes = 60 * 24 * 30;

            var creds = new SigningCredentials(_Key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(accessMinutes),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var   token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        /// <summary>Opaque refresh token stored server-side on the user row.</summary>
        public static string CreateRefreshTokenValue()
        {
            var bytes = new byte[64];
            RandomNumberGenerator.Fill(bytes);
            return Convert.ToBase64String(bytes);
        }
    }
}

