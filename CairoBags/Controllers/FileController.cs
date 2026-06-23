using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace CairoBags.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FileController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public FileController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        [HttpPost("Upload")]
        [RequestSizeLimit(10 * 1024 * 1024)]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                var allowedExtensions = new[]
                {
                    ".jpg", ".jpeg", ".png", ".gif", ".webp",
                    ".webm", ".mp3", ".wav"
                };

                var blockedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
                {
                    ".exe", ".bat", ".cmd", ".com", ".msi", ".dll", ".scr", ".pif", ".js", ".jar", ".vbs", ".ps1",
                    ".html", ".htm", ".svg", ".php", ".asp", ".aspx"
                };

                var allowedContentTypePrefixes = new[]
                {
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                    "audio/webm",
                    "audio/mpeg",
                    "audio/wav"
                };

                var ext = Path.GetExtension(file.FileName ?? "").ToLowerInvariant();
                var contentType = (file.ContentType ?? string.Empty).ToLowerInvariant();

                if (!string.IsNullOrEmpty(ext) && blockedExtensions.Contains(ext))
                    return BadRequest("File type is not allowed.");

                var extAllowed = !string.IsNullOrEmpty(ext) && allowedExtensions.Contains(ext);
                // Browsers may send: audio/webm;codecs=opus → validate using StartsWith
                var contentTypeAllowed = !string.IsNullOrEmpty(contentType) &&
                                         allowedContentTypePrefixes.Any(t => contentType.StartsWith(t));

                if (!extAllowed && !contentTypeAllowed)
                {
                    return BadRequest("Invalid file type.");
                }

                var storageFolder = _configuration["FileStorage:Path"] ?? "FileStorage";
                var rootPath = _environment.ContentRootPath ?? Directory.GetCurrentDirectory();
                var saveDir = Path.Combine(rootPath, storageFolder);

                if (!Directory.Exists(saveDir))
                {
                    Directory.CreateDirectory(saveDir);
                }

                var fileName = $"{Guid.NewGuid()}{ext}";
                var fullPath = Path.Combine(saveDir, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var relativePath = $"/{storageFolder}/{fileName}";
                return Ok(new { url = relativePath });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "File upload failed.", detail = "Something went wrong" });
            }
        }
    }
}


