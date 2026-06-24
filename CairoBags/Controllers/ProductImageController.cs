using System.Security.Claims;
using CairoBags.Dto.Catalog;
using CairoBags.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CairoBags.Controllers;

[ApiController]
public class ProductImageController : ControllerBase
{
    private readonly IProductImageService _productImageService;

    public ProductImageController(IProductImageService productImageService)
    {
        _productImageService = productImageService;
    }

    [HttpGet("/api/products/{productId:int}/images")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProductImages(int productId, CancellationToken cancellationToken = default)
    {
        if (!await _productImageService.ProductExistsAsync(productId, storefront: true, cancellationToken))
            return NotFound(new { message = "Product not found." });

        var images = await _productImageService.GetProductImagesAsync(productId, storefront: true, cancellationToken);
        return Ok(images);
    }

    [HttpPost("/api/admin/products/{productId:int}/images")]
    [Authorize(Roles = "Admin")]
    [RequestSizeLimit(10 * 1024 * 1024)]
    public async Task<IActionResult> UploadProductImage(
        int productId,
        IFormFile file,
        [FromForm] UploadProductImageRequest request,
        CancellationToken cancellationToken = default)
    {
        var result = await _productImageService.UploadProductImageAsync(productId, file, request, GetUserId(), cancellationToken);
        return ToActionResult(result, created => Created($"/api/products/{productId}/images", created));
    }

    [HttpPost("/api/admin/products/{productId:int}/images/variant/{variantId:int}")]
    [Authorize(Roles = "Admin")]
    [RequestSizeLimit(10 * 1024 * 1024)]
    public async Task<IActionResult> UploadVariantImage(
        int productId,
        int variantId,
        IFormFile file,
        [FromForm] UploadProductImageRequest request,
        CancellationToken cancellationToken = default)
    {
        var result = await _productImageService.UploadVariantImageAsync(productId, variantId, file, request, GetUserId(), cancellationToken);
        return ToActionResult(result, created => Created($"/api/products/{productId}/images", created));
    }

    [HttpPut("/api/admin/products/{productId:int}/images/{imageId:int}/primary")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> SetPrimary(int productId, int imageId, CancellationToken cancellationToken = default)
    {
        var result = await _productImageService.SetPrimaryAsync(productId, imageId, GetUserId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpPut("/api/admin/products/{productId:int}/images/reorder")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Reorder(int productId, [FromBody] ReorderProductImagesRequest request, CancellationToken cancellationToken = default)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _productImageService.ReorderAsync(productId, request, GetUserId(), cancellationToken);
        return ToActionResult(result, Ok);
    }

    [HttpDelete("/api/admin/products/{productId:int}/images/{imageId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int productId, int imageId, CancellationToken cancellationToken = default)
    {
        var result = await _productImageService.DeleteImageAsync(productId, imageId, GetUserId(), cancellationToken);
        return ToActionResult(result, _ => NoContent());
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
            StatusCodes.Status403Forbidden => Forbid(),
            _ => BadRequest(new { code = result.ErrorCode, message = result.Message })
        };
    }
}
