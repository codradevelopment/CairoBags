using CairoBags.Models.Common;

namespace CairoBags.Models.Shipping;

public class ShippingZone : BaseEntity
{
    public ShippingZoneCode Code { get; set; }

    public decimal BaseShippingFee { get; set; }

    public decimal? FreeShippingThreshold { get; set; }

    public virtual ICollection<ShippingZoneTranslation> Translations { get; set; } = new List<ShippingZoneTranslation>();

    public virtual ICollection<Governorate> Governorates { get; set; } = new List<Governorate>();
}
