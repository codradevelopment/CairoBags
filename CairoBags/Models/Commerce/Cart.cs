using CairoBags.Models.Common;
using CairoBags.Models.Identity;

namespace CairoBags.Models.Commerce;

public class Cart : BaseEntity
{
    public string? UserId { get; set; }

    public string? SessionId { get; set; }

    public virtual ApplicationUser? User { get; set; }

    public virtual ICollection<CartItem> Items { get; set; } = new List<CartItem>();
}
