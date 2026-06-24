using CairoBags.Data;
using CairoBags.Dto.Orders;
using CairoBags.Models.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CairoBags.Controllers;

[ApiController]
[Route("api/shipping-addresses")]
[Authorize]
public class ShippingAddressController : ControllerBase
{
    private readonly CairoBagsContext _context;
    private readonly UserManager<Models.Identity.ApplicationUser> _userManager;

    public ShippingAddressController(
        CairoBagsContext context,
        UserManager<Models.Identity.ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyAddresses(CancellationToken cancellationToken)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var addresses = await _context.ShippingAddresses
            .AsNoTracking()
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.IsDefault)
            .ThenByDescending(a => a.UpdatedAt ?? a.CreatedAt)
            .Select(a => MapToDto(a))
            .ToListAsync(cancellationToken);

        return Ok(addresses);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAddress(
        [FromBody] CreateShippingAddressRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var now = DateTime.UtcNow;

        if (request.IsDefault)
        {
            var existingDefaults = await _context.ShippingAddresses
                .Where(a => a.UserId == userId && a.IsDefault)
                .ToListAsync(cancellationToken);

            foreach (var address in existingDefaults)
            {
                address.IsDefault = false;
                address.UpdatedAt = now;
            }
        }

        var hasAny = await _context.ShippingAddresses.AnyAsync(a => a.UserId == userId, cancellationToken);
        var entity = new ShippingAddress
        {
            UserId = userId,
            FullName = request.FullName.Trim(),
            PhoneNumber = request.PhoneNumber.Trim(),
            Governorate = request.Governorate.Trim(),
            City = request.City.Trim(),
            AddressLine1 = request.AddressLine1.Trim(),
            AddressLine2 = string.IsNullOrWhiteSpace(request.AddressLine2) ? null : request.AddressLine2.Trim(),
            PostalCode = string.IsNullOrWhiteSpace(request.PostalCode) ? null : request.PostalCode.Trim(),
            IsDefault = request.IsDefault || !hasAny,
            CreatedAt = now,
            CreatedBy = userId,
        };

        _context.ShippingAddresses.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(MapToDto(entity));
    }

    private static ShippingAddressDto MapToDto(ShippingAddress address) => new()
    {
        Id = address.Id,
        FullName = address.FullName,
        PhoneNumber = address.PhoneNumber,
        Governorate = address.Governorate,
        City = address.City,
        AddressLine1 = address.AddressLine1,
        AddressLine2 = address.AddressLine2,
        PostalCode = address.PostalCode,
        IsDefault = address.IsDefault,
    };
}
