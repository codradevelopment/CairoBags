using CairoBags.Dto.Payments;

namespace CairoBags.Service;

public interface IPaymentService
{
    Task<ServiceResult<PaymentDetailDto>> SubmitProofAsync(
        string userId,
        int orderId,
        SubmitPaymentProofRequest request,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<PaymentDetailDto>> GetPaymentByOrderIdAsync(
        string userId,
        int orderId,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<AdminPendingPaymentDto>> GetPendingReviewsAsync(
        CancellationToken cancellationToken = default);

    Task<ServiceResult<AdminPaymentDetailDto>> GetPaymentByIdAsync(
        int paymentId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<PaymentDetailDto>> ApprovePaymentAsync(
        int paymentId,
        string adminUserId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<PaymentDetailDto>> RejectPaymentAsync(
        int paymentId,
        string adminUserId,
        RejectPaymentRequest request,
        CancellationToken cancellationToken = default);
}
