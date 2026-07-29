using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Identity;

public class CustomerProfile : BaseEntity
{
    public string UserId { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? FirstName { get; set; }

    [MaxLength(100)]
    public string? LastName { get; set; }

    [MaxLength(200)]
    public string? DisplayName { get; set; }

    [MaxLength(500)]
    public string? ProfileImageUrl { get; set; }

    public bool MarketingOptIn { get; set; }

    public virtual ApplicationUser User { get; set; } = null!;
}
