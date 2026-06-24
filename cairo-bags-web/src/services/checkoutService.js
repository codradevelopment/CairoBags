import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function checkout(payload) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.checkout.create, payload).then(({ data }) => data)
  );
}
