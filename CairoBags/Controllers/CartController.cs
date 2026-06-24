using System.Security.Claims;
using CairoBags.Dto.Commerce;
using CairoBags.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CairoBags.Controllers;

[ApiController]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet("/api/cart")]
    public async Task<IActionResult> GetCart(CancellationToken cancellationToken = default)
    {
        var result = await _cartService.GetCartAsync(GetUserId(), GetSessionId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpPost("/api/cart/items")]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemRequest request, CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _cartService.AddItemAsync(GetUserId(), GetSessionId(), request, cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpPut("/api/cart/items/{variantId:int}")]
    public async Task<IActionResult> UpdateItem(
        int variantId,
        [FromBody] UpdateCartItemRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _cartService.UpdateItemQuantityAsync(GetUserId(), GetSessionId(), variantId, request, cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpDelete("/api/cart/items/{variantId:int}")]
    public async Task<IActionResult> RemoveItem(int variantId, CancellationToken cancellationToken = default)
    {
        var result = await _cartService.RemoveItemAsync(GetUserId(), GetSessionId(), variantId, cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpDelete("/api/cart")]
    public async Task<IActionResult> ClearCart(CancellationToken cancellationToken = default)
    {
        var result = await _cartService.ClearCartAsync(GetUserId(), GetSessionId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpPost("/api/cart/merge")]
    [Authorize]
    public async Task<IActionResult> MergeCart([FromBody] MergeCartRequest request, CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _cartService.MergeGuestCartAsync(userId, request.SessionId, cancellationToken);
        return ToActionResult(result, Ok);
    }

    private string? GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ??
        User.FindFirstValue("sub");

    private string? GetSessionId()
    {
        if (Request.Headers.TryGetValue("X-Session-Id", out var headerValue))
        {
            var value = headerValue.ToString();
            if (!string.IsNullOrWhiteSpace(value))
                return value.Trim();
        }

        if (Request.Query.TryGetValue("sessionId", out var queryValue))
        {
            var value = queryValue.ToString();
            if (!string.IsNullOrWhiteSpace(value))
                return value.Trim();
        }

        return null;
    }

    private IActionResult ToActionResult<T>(ServiceResult<T> result, Func<T, IActionResult> onSuccess)
    {
        if (result.Succeeded)
            return onSuccess(result.Data!);

        return (result.StatusCode ?? StatusCodes.Status400BadRequest) switch
        {
            StatusCodes.Status404NotFound => NotFound(new { code = result.ErrorCode, message = result.Message }),
            StatusCodes.Status401Unauthorized => Unauthorized(new { code = result.ErrorCode, message = result.Message }),
            StatusCodes.Status403Forbidden => Forbid(),
            _ => BadRequest(new { code = result.ErrorCode, message = result.Message })
        };
    }
}
