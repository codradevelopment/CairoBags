using CairoBags.Models.Payments;
using Microsoft.EntityFrameworkCore;

namespace CairoBags.Data;

internal static class PaymentSeedData
{
    private static readonly DateTime SeedCreatedAt = new(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public const int PaymentMethodCount = 6;

    public static void Apply(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PaymentMethod>().HasData(
            new PaymentMethod { Id = 1, Type = PaymentMethodType.CashOnDelivery, IsActive = true, CreatedAt = SeedCreatedAt },
            new PaymentMethod { Id = 2, Type = PaymentMethodType.InstaPay, IsActive = true, CreatedAt = SeedCreatedAt },
            new PaymentMethod { Id = 3, Type = PaymentMethodType.VodafoneCash, IsActive = true, CreatedAt = SeedCreatedAt },
            new PaymentMethod { Id = 4, Type = PaymentMethodType.OrangeCash, IsActive = true, CreatedAt = SeedCreatedAt },
            new PaymentMethod { Id = 5, Type = PaymentMethodType.EtisalatCash, IsActive = true, CreatedAt = SeedCreatedAt },
            new PaymentMethod { Id = 6, Type = PaymentMethodType.WEPay, IsActive = true, CreatedAt = SeedCreatedAt }
        );

        modelBuilder.Entity<PaymentMethodTranslation>().HasData(
            new PaymentMethodTranslation
            {
                Id = 1,
                PaymentMethodId = 1,
                LanguageCode = "en",
                DisplayName = "Cash On Delivery",
                Instructions = "Pay the courier when your order arrives.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 2,
                PaymentMethodId = 1,
                LanguageCode = "ar",
                DisplayName = "الدفع عند الاستلام",
                Instructions = "ادفع للمندوب عند استلام الطلب.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 3,
                PaymentMethodId = 2,
                LanguageCode = "en",
                DisplayName = "InstaPay",
                Instructions = "Transfer the order total via InstaPay, then upload your payment screenshot.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 4,
                PaymentMethodId = 2,
                LanguageCode = "ar",
                DisplayName = "إنستاباي",
                Instructions = "حوّل إجمالي الطلب عبر إنستاباي، ثم ارفع صورة إثبات الدفع.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 5,
                PaymentMethodId = 3,
                LanguageCode = "en",
                DisplayName = "Vodafone Cash",
                Instructions = "Send the order total to our Vodafone Cash wallet, then upload your payment screenshot.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 6,
                PaymentMethodId = 3,
                LanguageCode = "ar",
                DisplayName = "فودافون كاش",
                Instructions = "أرسل إجمالي الطلب إلى محفظة فودافون كاش الخاصة بنا، ثم ارفع صورة إثبات الدفع.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 7,
                PaymentMethodId = 4,
                LanguageCode = "en",
                DisplayName = "Orange Cash",
                Instructions = "Send the order total to our Orange Cash wallet, then upload your payment screenshot.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 8,
                PaymentMethodId = 4,
                LanguageCode = "ar",
                DisplayName = "أورانج كاش",
                Instructions = "أرسل إجمالي الطلب إلى محفظة أورانج كاش الخاصة بنا، ثم ارفع صورة إثبات الدفع.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 9,
                PaymentMethodId = 5,
                LanguageCode = "en",
                DisplayName = "Etisalat Cash",
                Instructions = "Send the order total to our Etisalat Cash wallet, then upload your payment screenshot.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 10,
                PaymentMethodId = 5,
                LanguageCode = "ar",
                DisplayName = "اتصالات كاش",
                Instructions = "أرسل إجمالي الطلب إلى محفظة اتصالات كاش الخاصة بنا، ثم ارفع صورة إثبات الدفع.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 11,
                PaymentMethodId = 6,
                LanguageCode = "en",
                DisplayName = "WE Pay",
                Instructions = "Send the order total via WE Pay, then upload your payment screenshot.",
                CreatedAt = SeedCreatedAt
            },
            new PaymentMethodTranslation
            {
                Id = 12,
                PaymentMethodId = 6,
                LanguageCode = "ar",
                DisplayName = "وي باي",
                Instructions = "أرسل إجمالي الطلب عبر وي باي، ثم ارفع صورة إثبات الدفع.",
                CreatedAt = SeedCreatedAt
            }
        );
    }
}
