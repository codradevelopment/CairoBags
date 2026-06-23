using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Inventories;

namespace CairoBags.Dto.Inventory;

public class InventoryListItemDto
{
    public int InventoryId { get; set; }
    public int ProductVariantId { get; set; }
    public int ProductId { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string? ProductNameEn { get; set; }
    public string? ProductNameAr { get; set; }
    public string ColorNameEn { get; set; } = string.Empty;
    public string ColorNameAr { get; set; } = string.Empty;
    public int QuantityOnHand { get; set; }
    public int QuantityReserved { get; set; }
    public int AvailableStock { get; set; }
    public int LowStockThreshold { get; set; }
    public bool IsLowStock { get; set; }
    public bool IsInStock { get; set; }
}

public class InventoryDetailsDto : InventoryListItemDto
{
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class InventoryStatusDto
{
    public int ProductVariantId { get; set; }
    public int ProductId { get; set; }
    public bool IsInStock { get; set; }
    public int AvailableStock { get; set; }
}

public class InventoryMovementDto
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string? Notes { get; set; }
    public string? ReferenceNumber { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class AdjustStockRequest
{
    public int Quantity { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    [MaxLength(64)]
    public string? ReferenceNumber { get; set; }
}

public class StockQuantityRequest
{
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    [MaxLength(64)]
    public string? ReferenceNumber { get; set; }
}

public static class InventoryMovementTypeNames
{
    public static string ToApiString(InventoryMovementType type) =>
        type switch
        {
            InventoryMovementType.Sale => "sale",
            InventoryMovementType.Return => "return",
            InventoryMovementType.Adjustment => "adjustment",
            InventoryMovementType.Reservation => "reservation",
            InventoryMovementType.ReleaseReservation => "release_reservation",
            _ => "adjustment"
        };
}
