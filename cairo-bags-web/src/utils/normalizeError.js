/**
 * Normalize axios and network errors into a consistent shape for UI layers.
 */
export function normalizeError(error) {
  if (!error) {
    return {
      status: null,
      code: null,
      message: "Unknown error",
      details: null,
      isNetworkError: true,
      isAuthError: false,
      raw: error,
    };
  }

  if (!error.response) {
    return {
      status: null,
      code: null,
      message: error.message || "Network error",
      details: null,
      isNetworkError: true,
      isAuthError: false,
      raw: error,
    };
  }

  const { status, data } = error.response;
  const message =
    data?.message ||
    (Array.isArray(data) ? data.join(", ") : null) ||
    error.message ||
    "Request failed";

  return {
    status,
    code: data?.code ?? null,
    message,
    details: data?.errors ?? data ?? null,
    isNetworkError: false,
    isAuthError: status === 401 || status === 403,
    raw: error,
  };
}

export async function handleServiceCall(promise) {
  try {
    return await promise;
  } catch (error) {
    throw normalizeError(error);
  }
}
