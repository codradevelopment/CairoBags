using CairoBags.Dto.Commerce;

namespace CairoBags.Service;

public interface ICartService
{
    Task<ServiceResult<CartDto>> GetCartAsync(
        string? userId,
        string? sessionId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<CartDto>> AddItemAsync(
        string? userId,
        string? sessionId,
        AddCartItemRequest request,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<CartDto>> UpdateItemQuantityAsync(
        string? userId,
        string? sessionId,
        int variantId,
        UpdateCartItemRequest request,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<CartDto>> RemoveItemAsync(
        string? userId,
        string? sessionId,
        int variantId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<CartDto>> ClearCartAsync(
        string? userId,
        string? sessionId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<CartDto>> MergeGuestCartAsync(
        string userId,
        string guestSessionId,
        CancellationToken cancellationToken = default);
}
