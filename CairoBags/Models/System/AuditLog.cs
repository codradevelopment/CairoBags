using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;
using CairoBags.Models.Identity;

namespace CairoBags.Models.System;

public class AuditLog : BaseEntity
{
    [MaxLength(450)]
    public string? UserId { get; set; }

    [MaxLength(128)]
    public string EntityName { get; set; } = string.Empty;

    [MaxLength(64)]
    public string? EntityId { get; set; }

    public AuditAction Action { get; set; }

    public string? OldValues { get; set; }

    public string? NewValues { get; set; }

    [MaxLength(45)]
    public string? IpAddress { get; set; }

    [MaxLength(512)]
    public string? UserAgent { get; set; }

    public virtual ApplicationUser? User { get; set; }
}
