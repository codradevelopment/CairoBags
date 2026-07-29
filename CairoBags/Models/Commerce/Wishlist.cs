using CairoBags.Models.Common;
using CairoBags.Models.Identity;

namespace CairoBags.Models.Commerce;

public class Wishlist : BaseEntity
{
    public string UserId { get; set; } = string.Empty;

    public virtual ApplicationUser User { get; set; } = null!;

    public virtual ICollection<WishlistItem> Items { get; set; } = new List<WishlistItem>();
}
