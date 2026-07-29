namespace CairoBags.Dto.Recommendations;

public class RecommendationProductDto
{
    public int ProductId { get; set; }

    public string ProductNameAr { get; set; } = string.Empty;

    public string ProductNameEn { get; set; } = string.Empty;

    public string? PrimaryImage { get; set; }

    public decimal? Price { get; set; }

    public bool IsInStock { get; set; }
}
