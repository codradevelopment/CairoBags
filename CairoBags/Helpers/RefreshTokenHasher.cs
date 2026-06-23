using System.Security.Cryptography;
using System.Text;

namespace CairoBags.Helpers;

/// <summary>Hashes opaque refresh tokens for storage; supports legacy plaintext rows until rotated.</summary>
public static class RefreshTokenHasher
{
    public static string Hash(string plainToken)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(plainToken));
        return Convert.ToHexString(bytes);
    }

    public static bool Matches(string? stored, string submittedPlain)
    {
        if (string.IsNullOrWhiteSpace(stored) || string.IsNullOrWhiteSpace(submittedPlain))
            return false;

        // Legacy: token stored in plaintext before hashing migration.
        if (stored == submittedPlain)
            return true;

        return string.Equals(stored, Hash(submittedPlain), StringComparison.OrdinalIgnoreCase);
    }
}
