using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Catalog;

public class CategoryTranslationDto
{
    public string LanguageCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
}

public class CategoryDto
{
    public int Id { get; set; }
    public int? ParentCategoryId { get; set; }
    public string? ImageUrl { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public CategoryTranslationDto? Arabic { get; set; }
    public CategoryTranslationDto? English { get; set; }
}

public class CategoryTreeNodeDto
{
    public int Id { get; set; }
    public int? ParentCategoryId { get; set; }
    public string? ImageUrl { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
    public CategoryTranslationDto? Arabic { get; set; }
    public CategoryTranslationDto? English { get; set; }
    public List<CategoryTreeNodeDto> Children { get; set; } = new();
}

public class CreateCategoryRequest
{
    public int? ParentCategoryId { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public int SortOrder { get; set; }

    public bool IsActive { get; set; } = true;

    [Required]
    [MaxLength(200)]
    public string NameAr { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string NameEn { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string SlugAr { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string SlugEn { get; set; } = string.Empty;

    public string? DescriptionAr { get; set; }

    public string? DescriptionEn { get; set; }

    [MaxLength(200)]
    public string? MetaTitleAr { get; set; }

    [MaxLength(200)]
    public string? MetaTitleEn { get; set; }

    [MaxLength(500)]
    public string? MetaDescriptionAr { get; set; }

    [MaxLength(500)]
    public string? MetaDescriptionEn { get; set; }
}

public class UpdateCategoryRequest
{
    public int? ParentCategoryId { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public int SortOrder { get; set; }

    public bool IsActive { get; set; } = true;

    [Required]
    [MaxLength(200)]
    public string NameAr { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string NameEn { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string SlugAr { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string SlugEn { get; set; } = string.Empty;

    public string? DescriptionAr { get; set; }

    public string? DescriptionEn { get; set; }

    [MaxLength(200)]
    public string? MetaTitleAr { get; set; }

    [MaxLength(200)]
    public string? MetaTitleEn { get; set; }

    [MaxLength(500)]
    public string? MetaDescriptionAr { get; set; }

    [MaxLength(500)]
    public string? MetaDescriptionEn { get; set; }
}
