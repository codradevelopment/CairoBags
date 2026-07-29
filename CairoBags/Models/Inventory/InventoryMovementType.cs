namespace CairoBags.Models.Inventories;

public enum InventoryMovementType : byte
{
    Sale = 1,
    Return = 2,
    Adjustment = 3,
    Reservation = 4,
    ReleaseReservation = 5
}
