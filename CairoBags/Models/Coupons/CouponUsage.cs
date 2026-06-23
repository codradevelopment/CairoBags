using CairoBags.Models.Common;
using CairoBags.Models.Identity;
using CairoBags.Models.Orders;

namespace CairoBags.Models.Coupons;

public class CouponUsage : BaseEntity
{
    public int CouponId { get; set; }

    public string UserId { get; set; } = string.Empty;

    public int OrderId { get; set; }

    public decimal DiscountAmount { get; set; }

    public virtual Coupon Coupon { get; set; } = null!;

    public virtual ApplicationUser User { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
