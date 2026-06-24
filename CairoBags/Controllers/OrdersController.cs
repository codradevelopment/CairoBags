using System.Security.Claims;
using CairoBags.Dto.Orders;
using CairoBags.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CairoBags.Controllers;

[ApiController]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet("/api/orders")]
    public async Task<IActionResult> GetMyOrders(CancellationToken cancellationToken = default)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { message = "Authentication is required." });

        var orders = await _orderService.GetMyOrdersAsync(userId, cancellationToken);
        return Ok(orders);
    }

    [HttpGet("/api/orders/{id:int}")]
    public async Task<IActionResult> GetOrderById(int id, CancellationToken cancellationToken = default)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _orderService.GetOrderByIdAsync(userId, id, cancellationToken);
        return ToActionResult(result, data => Ok(data));
    }

    [HttpPost("/api/orders/{id:int}/cancel")]
    public async Task<IActionResult> CancelOrder(int id, CancellationToken cancellationToken = default)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _orderService.CancelOrderAsync(userId, id, cancellationToken);
        return ToActionResult(result, data => Ok(data));
    }

    private string? GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ??
        User.FindFirstValue("sub");

    private IActionResult ToActionResult<T>(ServiceResult<T> result, Func<T, IActionResult> onSuccess)
    {
        if (result.Succeeded && result.Data != null)
            return onSuccess(result.Data);

        return (result.StatusCode ?? StatusCodes.Status400BadRequest) switch
        {
            StatusCodes.Status404NotFound => NotFound(new { code = result.ErrorCode, message = result.Message }),
            StatusCodes.Status409Conflict => Conflict(new { code = result.ErrorCode, message = result.Message }),
            StatusCodes.Status401Unauthorized => Unauthorized(new { code = result.ErrorCode, message = result.Message }),
            _ => BadRequest(new { code = result.ErrorCode, message = result.Message })
        };
    }
}
