using CairoBags.Dto.Checkout;

namespace CairoBags.Service;

public interface ICheckoutService
{
    Task<ServiceResult<CheckoutResponseDto>> CheckoutAsync(
        string userId,
        CheckoutRequest request,
        CancellationToken cancellationToken = default);
}
