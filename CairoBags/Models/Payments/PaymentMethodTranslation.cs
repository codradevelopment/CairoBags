using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Payments;

public class PaymentMethodTranslation : BaseEntity
{
    public int PaymentMethodId { get; set; }

    [MaxLength(2)]
    public string LanguageCode { get; set; } = "en";

    [MaxLength(200)]
    public string DisplayName { get; set; } = string.Empty;

    public string? Instructions { get; set; }

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;
}
