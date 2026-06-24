namespace CairoBags.Models.System;

public enum AuditAction : byte
{
    Create = 1,
    Update = 2,
    Delete = 3,
    Approve = 4,
    Reject = 5,
    Login = 6,
    Logout = 7
}
