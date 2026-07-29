using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Catalog;
using CairoBags.Models.Common;

namespace CairoBags.Models.Inventories;

public class Inventory : BaseEntity
{
    public int ProductVariantId { get; set; }

    public int QuantityOnHand { get; set; }

    public int QuantityReserved { get; set; }

    public int LowStockThreshold { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; } = null!;

    public virtual ProductVariant ProductVariant { get; set; } = null!;

    public virtual ICollection<InventoryMovement> Movements { get; set; } = new List<InventoryMovement>();
}
