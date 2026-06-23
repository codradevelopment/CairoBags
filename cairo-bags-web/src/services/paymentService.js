import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import {
  buildPaymentProofFormData,
  handleServiceCall,
  toMultipartConfig,
} from "../utils/index.js";

export async function submitPaymentProof(orderId, payload) {
  const formData = buildPaymentProofFormData(payload);
  return handleServiceCall(
    axiosInstance
      .post(ENDPOINTS.payments.proof(orderId), formData, toMultipartConfig())
      .then(({ data }) => data)
  );
}

export async function getPaymentByOrder(orderId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.payments.byOrder(orderId)).then(({ data }) => data)
  );
}
