using CairoBags.Models.Catalog;
using CairoBags.Models.Common;

namespace CairoBags.Models.Commerce;

public class WishlistItem : BaseEntity
{
    public int WishlistId { get; set; }

    public int ProductId { get; set; }

    public virtual Wishlist Wishlist { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
