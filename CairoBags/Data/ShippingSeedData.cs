using CairoBags.Models.Shipping;
using Microsoft.EntityFrameworkCore;

namespace CairoBags.Data;

internal static class ShippingSeedData
{
    private static readonly DateTime SeedCreatedAt = new(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public const int GovernorateCount = 27;

    public static void Apply(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ShippingZone>().HasData(
            new ShippingZone
            {
                Id = 1,
                Code = ShippingZoneCode.Cairo,
                BaseShippingFee = 50m,
                FreeShippingThreshold = 1500m,
                CreatedAt = SeedCreatedAt
            },
            new ShippingZone
            {
                Id = 2,
                Code = ShippingZoneCode.Giza,
                BaseShippingFee = 60m,
                FreeShippingThreshold = 1500m,
                CreatedAt = SeedCreatedAt
            },
            new ShippingZone
            {
                Id = 3,
                Code = ShippingZoneCode.OtherGovernorates,
                BaseShippingFee = 90m,
                FreeShippingThreshold = 2000m,
                CreatedAt = SeedCreatedAt
            }
        );

        modelBuilder.Entity<ShippingZoneTranslation>().HasData(
            new ShippingZoneTranslation { Id = 1, ShippingZoneId = 1, LanguageCode = "en", Name = "Cairo", CreatedAt = SeedCreatedAt },
            new ShippingZoneTranslation { Id = 2, ShippingZoneId = 1, LanguageCode = "ar", Name = "القاهرة", CreatedAt = SeedCreatedAt },
            new ShippingZoneTranslation { Id = 3, ShippingZoneId = 2, LanguageCode = "en", Name = "Giza", CreatedAt = SeedCreatedAt },
            new ShippingZoneTranslation { Id = 4, ShippingZoneId = 2, LanguageCode = "ar", Name = "الجيزة", CreatedAt = SeedCreatedAt },
            new ShippingZoneTranslation { Id = 5, ShippingZoneId = 3, LanguageCode = "en", Name = "Other Governorates", CreatedAt = SeedCreatedAt },
            new ShippingZoneTranslation { Id = 6, ShippingZoneId = 3, LanguageCode = "ar", Name = "باقي المحافظات", CreatedAt = SeedCreatedAt }
        );

        modelBuilder.Entity<Governorate>().HasData(
            new Governorate { Id = 1, ShippingZoneId = 1, NameAr = "القاهرة", NameEn = "Cairo", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 2, ShippingZoneId = 2, NameAr = "الجيزة", NameEn = "Giza", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 3, ShippingZoneId = 3, NameAr = "الإسكندرية", NameEn = "Alexandria", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 4, ShippingZoneId = 3, NameAr = "الدقهلية", NameEn = "Dakahlia", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 5, ShippingZoneId = 3, NameAr = "البحر الأحمر", NameEn = "Red Sea", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 6, ShippingZoneId = 3, NameAr = "البحيرة", NameEn = "Beheira", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 7, ShippingZoneId = 3, NameAr = "الفيوم", NameEn = "Fayoum", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 8, ShippingZoneId = 3, NameAr = "الغربية", NameEn = "Gharbia", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 9, ShippingZoneId = 3, NameAr = "الإسماعيلية", NameEn = "Ismailia", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 10, ShippingZoneId = 3, NameAr = "المنوفية", NameEn = "Monufia", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 11, ShippingZoneId = 3, NameAr = "المنيا", NameEn = "Minya", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 12, ShippingZoneId = 3, NameAr = "القليوبية", NameEn = "Qalyubia", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 13, ShippingZoneId = 3, NameAr = "الوادي الجديد", NameEn = "New Valley", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 14, ShippingZoneId = 3, NameAr = "السويس", NameEn = "Suez", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 15, ShippingZoneId = 3, NameAr = "أسوان", NameEn = "Aswan", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 16, ShippingZoneId = 3, NameAr = "أسيوط", NameEn = "Assiut", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 17, ShippingZoneId = 3, NameAr = "بني سويف", NameEn = "Beni Suef", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 18, ShippingZoneId = 3, NameAr = "بورسعيد", NameEn = "Port Said", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 19, ShippingZoneId = 3, NameAr = "دمياط", NameEn = "Damietta", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 20, ShippingZoneId = 3, NameAr = "الشرقية", NameEn = "Sharqia", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 21, ShippingZoneId = 3, NameAr = "جنوب سيناء", NameEn = "South Sinai", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 22, ShippingZoneId = 3, NameAr = "كفر الشيخ", NameEn = "Kafr El Sheikh", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 23, ShippingZoneId = 3, NameAr = "مطروح", NameEn = "Matrouh", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 24, ShippingZoneId = 3, NameAr = "الأقصر", NameEn = "Luxor", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 25, ShippingZoneId = 3, NameAr = "قنا", NameEn = "Qena", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 26, ShippingZoneId = 3, NameAr = "شمال سيناء", NameEn = "North Sinai", CreatedAt = SeedCreatedAt },
            new Governorate { Id = 27, ShippingZoneId = 3, NameAr = "سوهاج", NameEn = "Sohag", CreatedAt = SeedCreatedAt }
        );
    }
}
