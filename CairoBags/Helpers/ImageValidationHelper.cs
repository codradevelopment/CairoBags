namespace CairoBags.Helpers;

/// <summary>Validates uploaded images by magic bytes (not only Content-Type).</summary>
public static class ImageValidationHelper
{
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg", "image/jpg", "image/png", "image/webp"
    };

    public static bool IsAllowedContentType(string? contentType) =>
        !string.IsNullOrWhiteSpace(contentType) && AllowedContentTypes.Contains(contentType.Trim());

    public static bool HasValidImageSignature(Stream stream, out string normalizedContentType)
    {
        normalizedContentType = "image/jpeg";
        if (!stream.CanRead)
            return false;

        Span<byte> header = stackalloc byte[12];
        var read = 0;
        while (read < header.Length)
        {
            var n = stream.Read(header.Slice(read));
            if (n == 0) break;
            read += n;
        }

        if (read < 3)
            return false;

        // JPEG: FF D8 FF
        if (header[0] == 0xFF && header[1] == 0xD8 && header[2] == 0xFF)
        {
            normalizedContentType = "image/jpeg";
            return true;
        }

        // PNG: 89 50 4E 47
        if (read >= 4 && header[0] == 0x89 && header[1] == 0x50 && header[2] == 0x4E && header[3] == 0x47)
        {
            normalizedContentType = "image/png";
            return true;
        }

        // WebP: RIFF....WEBP
        if (read >= 12
            && header[0] == 0x52 && header[1] == 0x49 && header[2] == 0x46 && header[3] == 0x46
            && header[8] == 0x57 && header[9] == 0x45 && header[10] == 0x42 && header[11] == 0x50)
        {
            normalizedContentType = "image/webp";
            return true;
        }

        return false;
    }
}
