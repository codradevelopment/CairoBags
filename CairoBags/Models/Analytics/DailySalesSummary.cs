using CairoBags.Models.Common;

namespace CairoBags.Models.Analytics;

public class DailySalesSummary : BaseEntity
{
    public DateOnly SummaryDate { get; set; }

    public int OrdersCount { get; set; }

    public decimal Revenue { get; set; }

    public decimal AverageOrderValue { get; set; }

    public int CustomersCount { get; set; }
}
