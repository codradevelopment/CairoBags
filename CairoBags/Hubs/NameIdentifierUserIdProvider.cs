using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace CairoBags.Hubs;

/// <summary>
/// Maps SignalR <see cref="HubConnectionContext.UserIdentifier"/> to the JWT nameidentifier claim.
/// </summary>
public sealed class NameIdentifierUserIdProvider : IUserIdProvider
{
    public string? GetUserId(HubConnectionContext connection)
    {
        var user = connection.User;
        if (user == null) return null;
        return user.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? user.FindFirstValue(JwtRegisteredClaimNames.Sub);
    }
}
