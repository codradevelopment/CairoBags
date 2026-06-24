import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function getSystemSettings() {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.systemSettings.get).then(({ data }) => data)
  );
}

export async function updateSystemSettings(payload) {
  return handleServiceCall(
    axiosInstance.put(ENDPOINTS.systemSettings.update, payload).then(({ data }) => data)
  );
}
