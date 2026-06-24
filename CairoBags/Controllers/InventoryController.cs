using System.Security.Claims;
using CairoBags.Dto.Inventory;
using CairoBags.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CairoBags.Controllers;

[ApiController]
public class InventoryController : ControllerBase
{
    private readonly IInventoryService _inventoryService;

    public InventoryController(IInventoryService inventoryService)
    {
        _inventoryService = inventoryService;
    }

    [HttpGet("/api/admin/inventory")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetInventoryList(CancellationToken cancellationToken = default)
    {
        var items = await _inventoryService.GetInventoryListAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("/api/admin/inventory/low-stock")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetLowStock(CancellationToken cancellationToken = default)
    {
        var items = await _inventoryService.GetLowStockProductsAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("/api/admin/inventory/{variantId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetInventoryDetails(int variantId, CancellationToken cancellationToken = default)
    {
        var inventory = await _inventoryService.GetInventoryByVariantIdAsync(variantId, cancellationToken);
        if (inventory == null)
            return NotFound(new { message = "Inventory not found." });

        return Ok(inventory);
    }

    [HttpGet("/api/admin/inventory/{variantId:int}/movements")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetMovementHistory(int variantId, CancellationToken cancellationToken = default)
    {
        var movements = await _inventoryService.GetMovementHistoryAsync(variantId, cancellationToken);
        if (movements.Count == 0)
        {
            var exists = await _inventoryService.GetInventoryByVariantIdAsync(variantId, cancellationToken);
            if (exists == null)
                return NotFound(new { message = "Inventory not found." });
        }

        return Ok(movements);
    }

    [HttpPost("/api/admin/inventory/{variantId:int}/adjust")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AdjustStock(
        int variantId,
        [FromBody] AdjustStockRequest request,
        CancellationToken cancellationToken = default)
    {
        var result = await _inventoryService.AdjustStockAsync(variantId, request, GetUserId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpPost("/api/admin/inventory/{variantId:int}/reserve")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ReserveStock(
        int variantId,
        [FromBody] StockQuantityRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _inventoryService.ReserveStockAsync(variantId, request, GetUserId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpPost("/api/admin/inventory/{variantId:int}/release")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ReleaseReservation(
        int variantId,
        [FromBody] StockQuantityRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _inventoryService.ReleaseReservationAsync(variantId, request, GetUserId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpGet("/api/inventory/{variantId:int}/status")]
    [AllowAnonymous]
    public async Task<IActionResult> GetInventoryStatus(int variantId, CancellationToken cancellationToken = default)
    {
        var status = await _inventoryService.GetInventoryStatusAsync(variantId, cancellationToken);
        if (status == null)
            return NotFound(new { message = "Inventory status not found." });

        return Ok(status);
    }

    private string? GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ??
        User.FindFirstValue("sub");

    private IActionResult ToActionResult<T>(ServiceResult<T> result, Func<T, IActionResult> onSuccess)
    {
        if (result.Succeeded)
            return onSuccess(result.Data!);

        return (result.StatusCode ?? StatusCodes.Status400BadRequest) switch
        {
            StatusCodes.Status404NotFound => NotFound(new { code = result.ErrorCode, message = result.Message }),
            StatusCodes.Status409Conflict => Conflict(new { code = result.ErrorCode, message = result.Message }),
            StatusCodes.Status403Forbidden => Forbid(),
            _ => BadRequest(new { code = result.ErrorCode, message = result.Message })
        };
    }
}
