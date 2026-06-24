import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function getPendingPayments(config = {}) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.adminPayments.pending, config).then(({ data }) => data)
  );
}

export async function getAdminPaymentById(paymentId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.adminPayments.byId(paymentId)).then(({ data }) => data)
  );
}

export async function approvePayment(paymentId) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.adminPayments.approve(paymentId)).then(({ data }) => data)
  );
}

export async function rejectPayment(paymentId, payload) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.adminPayments.reject(paymentId), payload).then(({ data }) => data)
  );
}
