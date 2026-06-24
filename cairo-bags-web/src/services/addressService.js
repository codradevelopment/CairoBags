import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function getShippingAddresses() {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.shippingAddresses.list).then(({ data }) => data)
  );
}

export async function createShippingAddress(payload) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.shippingAddresses.create, payload).then(({ data }) => data)
  );
}
