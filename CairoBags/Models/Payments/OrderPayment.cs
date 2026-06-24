using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;
using CairoBags.Models.Orders;

namespace CairoBags.Models.Payments;

public class OrderPayment : BaseEntity
{
    public int OrderId { get; set; }

    public int PaymentMethodId { get; set; }

    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

    public decimal Amount { get; set; }

    [MaxLength(200)]
    public string? SenderName { get; set; }

    [MaxLength(32)]
    public string? SenderPhone { get; set; }

    [MaxLength(128)]
    public string? TransactionReference { get; set; }

    [MaxLength(450)]
    public string? ReviewedBy { get; set; }

    public DateTime? ReviewedAt { get; set; }

    [MaxLength(1000)]
    public string? ReviewNotes { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;

    public virtual ICollection<PaymentProofImage> ProofImages { get; set; } = new List<PaymentProofImage>();
}
