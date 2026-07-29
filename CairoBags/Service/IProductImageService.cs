using CairoBags.Dto.Catalog;
using Microsoft.AspNetCore.Http;

namespace CairoBags.Service;

public interface IProductImageService
{
    Task<IReadOnlyList<ProductImageDto>> GetProductImagesAsync(
        int productId,
        bool storefront,
        CancellationToken cancellationToken = default);

    Task<bool> ProductExistsAsync(int productId, bool storefront, CancellationToken cancellationToken = default);

    Task<ServiceResult<ProductImageDto>> UploadProductImageAsync(
        int productId,
        IFormFile file,
        UploadProductImageRequest request,
        string? userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<ProductImageDto>> UploadVariantImageAsync(
        int productId,
        int variantId,
        IFormFile file,
        UploadProductImageRequest request,
        string? userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<ProductImageDto>> SetPrimaryAsync(
        int productId,
        int imageId,
        string? userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<IReadOnlyList<ProductImageDto>>> ReorderAsync(
        int productId,
        ReorderProductImagesRequest request,
        string? userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<bool>> DeleteImageAsync(
        int productId,
        int imageId,
        string? userId,
        CancellationToken cancellationToken = default);
}
