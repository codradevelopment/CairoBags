using System.ComponentModel.DataAnnotations;

namespace CairoBags.Dto.Catalog;

public class UploadProductImageRequest
{
    [MaxLength(200)]
    public string? AltTextAr { get; set; }

    [MaxLength(200)]
    public string? AltTextEn { get; set; }

    public bool IsPrimary { get; set; }

    public int? SortOrder { get; set; }
}

public class ReorderProductImagesRequest
{
    [MinLength(1)]
    public List<ReorderProductImageItem> Items { get; set; } = new();
}

public class ReorderProductImageItem
{
    public int ImageId { get; set; }

    public int SortOrder { get; set; }
}
