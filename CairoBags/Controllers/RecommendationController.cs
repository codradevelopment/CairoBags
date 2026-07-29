using System.Security.Claims;
using CairoBags.Dto.Recommendations;
using CairoBags.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CairoBags.Controllers;

[ApiController]
public class RecommendationController : ControllerBase
{
    private readonly IRecommendationService _recommendationService;

    public RecommendationController(IRecommendationService recommendationService)
    {
        _recommendationService = recommendationService;
    }

    [HttpGet("/api/recommendations/trending")]
    [AllowAnonymous]
    public async Task<IActionResult> GetTrending(CancellationToken cancellationToken = default)
    {
        var items = await _recommendationService.GetTrendingAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("/api/recommendations/recently-viewed")]
    [AllowAnonymous]
    public async Task<IActionResult> GetRecentlyViewed(CancellationToken cancellationToken = default)
    {
        var items = await _recommendationService.GetRecentlyViewedAsync(
            GetUserId(),
            GetSessionId(),
            cancellationToken);

        return Ok(items);
    }

    [HttpGet("/api/recommendations/similar/{productId:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetSimilar(int productId, CancellationToken cancellationToken = default)
    {
        var result = await _recommendationService.GetSimilarAsync(productId, cancellationToken);
        return ToActionResult(result);
    }

    [HttpGet("/api/recommendations/frequently-bought-together/{productId:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFrequentlyBoughtTogether(
        int productId,
        CancellationToken cancellationToken = default)
    {
        var result = await _recommendationService.GetFrequentlyBoughtTogetherAsync(productId, cancellationToken);
        return ToActionResult(result);
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

    private IActionResult ToActionResult(ServiceResult<IReadOnlyList<RecommendationProductDto>> result)
    {
        if (result.Succeeded && result.Data != null)
            return Ok(result.Data);

        return (result.StatusCode ?? StatusCodes.Status400BadRequest) switch
        {
            StatusCodes.Status404NotFound => NotFound(new { code = result.ErrorCode, message = result.Message }),
            _ => BadRequest(new { code = result.ErrorCode, message = result.Message })
        };
    }
}
