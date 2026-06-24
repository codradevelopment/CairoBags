using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Orders;

public class OrderStatusHistory : BaseEntity
{
    public int OrderId { get; set; }

    public OrderStatus? OldStatus { get; set; }

    public OrderStatus NewStatus { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    public virtual Order Order { get; set; } = null!;
}
