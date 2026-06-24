using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CairoBags.Hubs;

/// <summary>
/// Per-user group: <c>user-{userId}</c> (JWT sub) for scalable push; must match <see cref="NotificationService"/> sends.
/// </summary>
[Authorize]
public class NotificationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, NotificationGroupNames.ForUser(userId));
        }
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, NotificationGroupNames.ForUser(userId));
        }
        await base.OnDisconnectedAsync(exception);
    }
}
