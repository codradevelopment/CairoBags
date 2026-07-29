using CairoBags.Dto.Recommendations;

namespace CairoBags.Service;

public interface IRecommendationService
{
    Task<IReadOnlyList<RecommendationProductDto>> GetTrendingAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<RecommendationProductDto>> GetRecentlyViewedAsync(
        string? userId,
        string? sessionId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<IReadOnlyList<RecommendationProductDto>>> GetSimilarAsync(
        int productId,
        CancellationToken cancellationToken = default);

    Task<ServiceResult<IReadOnlyList<RecommendationProductDto>>> GetFrequentlyBoughtTogetherAsync(
        int productId,
        CancellationToken cancellationToken = default);
}
