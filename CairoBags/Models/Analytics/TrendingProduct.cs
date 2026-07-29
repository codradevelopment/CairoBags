using CairoBags.Models.Catalog;
using CairoBags.Models.Common;

namespace CairoBags.Models.Analytics;

public class TrendingProduct : BaseEntity
{
    public int ProductId { get; set; }

    public decimal Score { get; set; }

    public DateTime LastCalculatedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}
