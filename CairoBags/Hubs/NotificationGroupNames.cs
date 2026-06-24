namespace CairoBags.Hubs;

/// <summary>SignalR group per user: must match <see cref="NotificationHub"/> join/leave and notification sends.</summary>
public static class NotificationGroupNames
{
    public const string Prefix = "user-";

    public static string ForUser(string userId) => $"{Prefix}{userId}";
}
