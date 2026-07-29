using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Shipping;

public class ShippingZoneTranslation : BaseEntity
{
    public int ShippingZoneId { get; set; }

    [MaxLength(2)]
    public string LanguageCode { get; set; } = "en";

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public virtual ShippingZone ShippingZone { get; set; } = null!;
}
