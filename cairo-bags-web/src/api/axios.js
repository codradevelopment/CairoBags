import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints.js";
import { STORAGE_KEYS } from "../constants/index.js";
import { getRefreshToken, clearAuthStorage, setAccessToken } from "../utils/authStorage.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";
    const isRefreshRequest = requestUrl.includes(ENDPOINTS.account.refreshToken);
    const isLoginRequest = requestUrl.includes(ENDPOINTS.account.login);

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      isRefreshRequest ||
      isLoginRequest
    ) {
      return Promise.reject(error);
    }

    const existingToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!existingToken) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      try {
        const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      axios
        .post(
          `${axiosInstance.defaults.baseURL}${ENDPOINTS.account.refreshToken}`,
          { refreshToken: getRefreshToken() },
          { withCredentials: true }
        )
        .then(({ data }) => {
          const newToken = data.token;
          if (!newToken) {
            throw new Error("Refresh token endpoint did not return a token.");
          }
          setAccessToken(newToken);
          if (data.refreshToken) {
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
          }
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          resolve(axiosInstance(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          clearAuthStorage();
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }
);

export default axiosInstance;
