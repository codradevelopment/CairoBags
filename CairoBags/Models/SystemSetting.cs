using System.ComponentModel.DataAnnotations;

namespace CairoBags.Models;

public class SystemSetting
{
    public int Id { get; set; }

    [MaxLength(200)]
    public string StoreNameAr { get; set; } = "كايرو باجز";

    [MaxLength(200)]
    public string StoreNameEn { get; set; } = "Cairo Bags";

    [MaxLength(256)]
    public string? StoreEmail { get; set; }

    [MaxLength(32)]
    public string? StorePhone { get; set; }

    [MaxLength(500)]
    public string? StoreAddress { get; set; }

    [MaxLength(500)]
    public string? FacebookUrl { get; set; }

    [MaxLength(500)]
    public string? InstagramUrl { get; set; }

    [MaxLength(500)]
    public string? TikTokUrl { get; set; }

    [MaxLength(32)]
    public string? WhatsAppNumber { get; set; }

    [MaxLength(3)]
    public string DefaultCurrency { get; set; } = "EGP";

    public decimal? FreeShippingThreshold { get; set; }

    public bool MaintenanceMode { get; set; }

    public bool BetaFeatures { get; set; }
}
