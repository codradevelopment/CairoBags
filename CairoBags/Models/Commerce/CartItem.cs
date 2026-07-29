using CairoBags.Models.Catalog;
using CairoBags.Models.Common;

namespace CairoBags.Models.Commerce;

public class CartItem : BaseEntity
{
    public int CartId { get; set; }

    public int ProductVariantId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual ProductVariant ProductVariant { get; set; } = null!;
}
