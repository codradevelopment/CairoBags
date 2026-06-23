namespace CairoBags.Models.Orders;

public enum OrderStatus : byte
{
    Pending = 1,
    AwaitingPayment = 2,
    PaymentProofSubmitted = 3,
    PaymentUnderReview = 4,
    PaymentConfirmed = 5,
    Processing = 6,
    Shipped = 7,
    Delivered = 8,
    Completed = 9,
    Cancelled = 10,
    Refunded = 11
}
