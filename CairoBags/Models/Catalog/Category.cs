using CairoBags.Models.Common;
using CairoBags.Models.Coupons;

namespace CairoBags.Models.Catalog;

public class Category : BaseEntity
{
    public int? ParentCategoryId { get; set; }

    public string? ImageUrl { get; set; }

    public int SortOrder { get; set; }

    public bool IsActive { get; set; } = true;

    public bool IsDeleted { get; set; }

    public virtual Category? ParentCategory { get; set; }

    public virtual ICollection<Category> SubCategories { get; set; } = new List<Category>();

    public virtual ICollection<CategoryTranslation> Translations { get; set; } = new List<CategoryTranslation>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<Coupon> Coupons { get; set; } = new List<Coupon>();
}
