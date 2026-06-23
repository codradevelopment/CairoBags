using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Catalog;
using CairoBags.Models.Common;
using CairoBags.Models.Identity;

namespace CairoBags.Models.Reviews;

public class ProductReview : BaseEntity
{
    public int ProductId { get; set; }

    public string UserId { get; set; } = string.Empty;

    public byte Rating { get; set; }

    [MaxLength(2000)]
    public string? Comment { get; set; }

    public ReviewStatus Status { get; set; } = ReviewStatus.Pending;

    public bool IsVerifiedPurchase { get; set; }

    [MaxLength(2000)]
    public string? AdminResponse { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ApplicationUser User { get; set; } = null!;

    public virtual ICollection<ReviewImage> Images { get; set; } = new List<ReviewImage>();
}
