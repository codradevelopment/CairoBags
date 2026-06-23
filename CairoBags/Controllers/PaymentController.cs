using System.Security.Claims;
using CairoBags.Dto.Payments;
using CairoBags.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CairoBags.Controllers;

[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpPost("/api/payments/{orderId:int}/proof")]
    [Authorize]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(50 * 1024 * 1024)]
    public async Task<IActionResult> SubmitProof(
        int orderId,
        [FromForm] SubmitPaymentProofRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _paymentService.SubmitProofAsync(userId, orderId, request, cancellationToken);
        return ToActionResult(result, data => Ok(data));
    }

    [HttpGet("/api/payments/{orderId:int}")]
    [Authorize]
    public async Task<IActionResult> GetPaymentByOrder(int orderId, CancellationToken cancellationToken = default)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _paymentService.GetPaymentByOrderIdAsync(userId, orderId, cancellationToken);
        return ToActionResult(result, data => Ok(data));
    }

    [HttpGet("/api/admin/payments/pending")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPendingReviews(CancellationToken cancellationToken = default)
    {
        var items = await _paymentService.GetPendingReviewsAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("/api/admin/payments/{paymentId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPaymentById(int paymentId, CancellationToken cancellationToken = default)
    {
        var result = await _paymentService.GetPaymentByIdAsync(paymentId, cancellationToken);
        return ToActionResult(result, data => Ok(data));
    }

    [HttpPost("/api/admin/payments/{paymentId:int}/approve")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ApprovePayment(int paymentId, CancellationToken cancellationToken = default)
    {
        var adminUserId = GetUserId();
        if (string.IsNullOrEmpty(adminUserId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _paymentService.ApprovePaymentAsync(paymentId, adminUserId, cancellationToken);
        return ToActionResult(result, data => Ok(data));
    }

    [HttpPost("/api/admin/payments/{paymentId:int}/reject")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RejectPayment(
        int paymentId,
        [FromBody] RejectPaymentRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var adminUserId = GetUserId();
        if (string.IsNullOrEmpty(adminUserId))
            return Unauthorized(new { message = "Authentication is required." });

        var result = await _paymentService.RejectPaymentAsync(paymentId, adminUserId, request, cancellationToken);
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
