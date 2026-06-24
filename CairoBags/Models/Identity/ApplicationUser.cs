using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CairoBags.Models;
using CairoBags.Models.Analytics;
using CairoBags.Models.Commerce;
using CairoBags.Models.Coupons;
using CairoBags.Models.Orders;
using CairoBags.Models.Reviews;
using CairoBags.Models.System;
using Microsoft.AspNetCore.Identity;

namespace CairoBags.Models.Identity;

[Table("Users")]
public class ApplicationUser : IdentityUser
{
    /// <summary>Authentication provider for the account (e.g., "Local" or "Google").</summary>
    public string AuthProvider { get; set; } = "Local";

    /// <summary>Whether the user has a local password set (Google users start without one).</summary>
    public bool HasPassword { get; set; }

    /// <summary>True only on the first successful Google login, then flipped off.</summary>
    public bool IsFirstLogin { get; set; }

    /// <summary>Explicit UI-friendly flag for Google-authenticated accounts.</summary>
    public bool IsGoogleUser { get; set; }

    /// <summary>JSON blob for per-user notification settings.</summary>
    public string? NotificationSettingsJson { get; set; }

    /// <summary>Opaque refresh token (rotated on each refresh). Stored server-side only.</summary>
    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiresUtc { get; set; }

    /// <summary>When true, the user must change password before using the app.</summary>
    public bool MustChangePassword { get; set; }

    /// <summary>Preferred UI language: en or ar.</summary>
    [MaxLength(2)]
    public string PreferredLanguage { get; set; } = "en";

    public virtual CustomerProfile? CustomerProfile { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual Wishlist? Wishlist { get; set; }

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<CouponUsage> CouponUsages { get; set; } = new List<CouponUsage>();

    public virtual ICollection<UserProductView> ProductViews { get; set; } = new List<UserProductView>();

    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public virtual ICollection<ShippingAddress> ShippingAddresses { get; set; } = new List<ShippingAddress>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
