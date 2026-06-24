using CairoBags.Models.Common;

namespace CairoBags.Models.Payments;

public class PaymentMethod : BaseEntity
{
    public PaymentMethodType Type { get; set; }

    public bool IsActive { get; set; } = true;

    public virtual ICollection<PaymentMethodTranslation> Translations { get; set; } = new List<PaymentMethodTranslation>();

    public virtual ICollection<OrderPayment> OrderPayments { get; set; } = new List<OrderPayment>();
}
