namespace CairoBags.Middleware;

/// <summary>
/// Handles client disconnects and aborted requests without surfacing as unhandled exceptions.
/// </summary>
public sealed class ClientCancellationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ClientCancellationMiddleware> _logger;

    public ClientCancellationMiddleware(RequestDelegate next, ILogger<ClientCancellationMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (OperationCanceledException) when (context.RequestAborted.IsCancellationRequested)
        {
            _logger.LogDebug("Request canceled by client: {Method} {Path}", context.Request.Method, context.Request.Path);

            if (!context.Response.HasStarted)
            {
                context.Response.Clear();
                context.Response.StatusCode = StatusCodes.Status499ClientClosedRequest;
            }
        }
    }
}

public static class ClientCancellationMiddlewareExtensions
{
    public static IApplicationBuilder UseClientCancellationHandling(this IApplicationBuilder app) =>
        app.UseMiddleware<ClientCancellationMiddleware>();
}
