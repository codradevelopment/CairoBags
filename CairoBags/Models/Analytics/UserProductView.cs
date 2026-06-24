using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Catalog;
using CairoBags.Models.Common;
using CairoBags.Models.Identity;

namespace CairoBags.Models.Analytics;

public class UserProductView : BaseEntity
{
    public string? UserId { get; set; }

    [MaxLength(128)]
    public string? SessionId { get; set; }

    public int ProductId { get; set; }

    public DateTime ViewedAt { get; set; }

    public virtual ApplicationUser? User { get; set; }

    public virtual Product Product { get; set; } = null!;
}
