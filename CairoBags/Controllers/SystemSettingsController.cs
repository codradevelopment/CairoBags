using CairoBags.Data;
using CairoBags.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CairoBags.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemSettingsController : ControllerBase
    {
        private readonly CairoBagsContext _context;

        public SystemSettingsController(CairoBagsContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var settings = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Id == 1);
            if (settings == null)
            {
                settings = new SystemSetting { Id = 1, MaintenanceMode = false, BetaFeatures = false };
                _context.SystemSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                maintenanceMode = settings.MaintenanceMode,
                betaFeatures = settings.BetaFeatures
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SystemSetting? dto)
        {
            if (dto == null) return BadRequest("Invalid payload.");

            var settings = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Id == 1);
            if (settings == null)
            {
                settings = new SystemSetting { Id = 1 };
                _context.SystemSettings.Add(settings);
            }

            settings.MaintenanceMode = dto.MaintenanceMode;
            settings.BetaFeatures = dto.BetaFeatures;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                maintenanceMode = settings.MaintenanceMode,
                betaFeatures = settings.BetaFeatures
            });
        }
    }
}

