using CairoBags.Dto.Inventory;

namespace CairoBags.Service;

public interface IInventoryService
{
    Task<IReadOnlyList<InventoryListItemDto>> GetInventoryListAsync(CancellationToken cancellationToken = default);

    Task<InventoryDetailsDto?> GetInventoryByVariantIdAsync(int variantId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<InventoryListItemDto>> GetLowStockProductsAsync(CancellationToken cancellationToken = default);

    Task<IReadOnlyList<InventoryMovementDto>> GetMovementHistoryAsync(int variantId, CancellationToken cancellationToken = default);

    Task<InventoryStatusDto?> GetInventoryStatusAsync(int variantId, CancellationToken cancellationToken = default);

    Task<ServiceResult<InventoryDetailsDto>> AdjustStockAsync(
        int variantId,
        AdjustStockRequest request,
        string? userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<InventoryDetailsDto>> ReserveStockAsync(
        int variantId,
        StockQuantityRequest request,
        string? userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<InventoryDetailsDto>> ReleaseReservationAsync(
        int variantId,
        StockQuantityRequest request,
        string? userId,
        CancellationToken cancellationToken = default);
}
