using CairoBags.Dto.Orders;

namespace CairoBags.Service;

public interface IOrderService
{
    Task<IReadOnlyList<OrderListItemDto>> GetMyOrdersAsync(
        string userId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<OrderDetailDto>> GetOrderByIdAsync(
        string userId,
        int orderId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<CancelOrderResponseDto>> CancelOrderAsync(
        string userId,
        int orderId,
        CancellationToken cancellationToken = default);
}
