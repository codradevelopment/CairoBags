using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;
using CairoBags.Models.Identity;

namespace CairoBags.Models.Orders;

public class ShippingAddress : BaseEntity
{
    public string UserId { get; set; } = string.Empty;

    [MaxLength(200)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(32)]
    public string PhoneNumber { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Governorate { get; set; } = string.Empty;

    [MaxLength(100)]
    public string City { get; set; } = string.Empty;

    [MaxLength(300)]
    public string AddressLine1 { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? AddressLine2 { get; set; }

    [MaxLength(20)]
    public string? PostalCode { get; set; }

    public bool IsDefault { get; set; }

    public virtual ApplicationUser User { get; set; } = null!;
}
