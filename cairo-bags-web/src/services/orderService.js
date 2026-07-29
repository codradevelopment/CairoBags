import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function getMyOrders() {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.orders.list).then(({ data }) => data)
  );
}

export async function getOrderById(id) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.orders.byId(id)).then(({ data }) => data)
  );
}

export async function cancelOrder(id) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.orders.cancel(id)).then(({ data }) => data)
  );
}
