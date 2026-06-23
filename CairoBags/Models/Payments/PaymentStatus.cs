namespace CairoBags.Models.Payments;

public enum PaymentStatus : byte
{
    Pending = 1,
    ProofSubmitted = 2,
    UnderReview = 3,
    Confirmed = 4,
    Rejected = 5,
    Refunded = 6
}
