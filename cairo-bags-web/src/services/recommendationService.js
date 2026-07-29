import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { buildSessionHeaders, getGuestSessionId, handleServiceCall } from "../utils/index.js";

export async function getTrending() {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.recommendations.trending).then(({ data }) => data)
  );
}

export async function getRecentlyViewed(sessionId) {
  return handleServiceCall(
    axiosInstance
      .get(ENDPOINTS.recommendations.recentlyViewed, {
        headers: buildSessionHeaders(sessionId ?? getGuestSessionId()),
      })
      .then(({ data }) => data)
  );
}

export async function getSimilarProducts(productId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.recommendations.similar(productId)).then(({ data }) => data)
  );
}

export async function getFrequentlyBoughtTogether(productId) {
  return handleServiceCall(
    axiosInstance
      .get(ENDPOINTS.recommendations.frequentlyBoughtTogether(productId))
      .then(({ data }) => data)
  );
}
