using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace CairoBags.Helpers;

/// <summary>
/// Development-only bypass: satisfies all authorization requirements when enabled via config.
/// </summary>
public sealed class AllowAllAuthorizationHandler : IAuthorizationHandler
{
    public Task HandleAsync(AuthorizationHandlerContext context)
    {
        foreach (var requirement in context.PendingRequirements.ToList())
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}

public static class TestingAuthorization
{
    public const string DisableAuthorizationKey = "Testing:DisableAuthorization";

    public static bool IsAuthorizationDisabled(IConfiguration configuration) =>
        configuration.GetValue(DisableAuthorizationKey, false);
}
