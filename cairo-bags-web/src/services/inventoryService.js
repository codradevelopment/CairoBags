import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function getInventoryStatus(variantId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.inventory.status(variantId)).then(({ data }) => data)
  );
}

export async function getInventoryList() {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.inventory.adminList).then(({ data }) => data)
  );
}

export async function getLowStockInventory(config = {}) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.inventory.adminLowStock, config).then(({ data }) => data)
  );
}

export async function getInventoryByVariant(variantId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.inventory.adminByVariant(variantId)).then(({ data }) => data)
  );
}

export async function getInventoryMovements(variantId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.inventory.adminMovements(variantId)).then(({ data }) => data)
  );
}

export async function adjustStock(variantId, payload) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.inventory.adminAdjust(variantId), payload).then(({ data }) => data)
  );
}

export async function reserveStock(variantId, payload) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.inventory.adminReserve(variantId), payload).then(({ data }) => data)
  );
}

export async function releaseStock(variantId, payload) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.inventory.adminRelease(variantId), payload).then(({ data }) => data)
  );
}
