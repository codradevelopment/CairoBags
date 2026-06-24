using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Inventories;

public class InventoryMovement : BaseEntity
{
    public int InventoryId { get; set; }

    public InventoryMovementType Type { get; set; }

    public int Quantity { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    [MaxLength(64)]
    public string? ReferenceNumber { get; set; }

    public virtual Inventory Inventory { get; set; } = null!;
}
