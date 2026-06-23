using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Payments;

public class PaymentProofImage : BaseEntity
{
    public int OrderPaymentId { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }

    public virtual OrderPayment OrderPayment { get; set; } = null!;
}
