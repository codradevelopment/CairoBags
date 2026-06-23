import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { buildSessionHeaders, getGuestSessionId, handleServiceCall } from "../utils/index.js";

function withSession(sessionId) {
  return { headers: buildSessionHeaders(sessionId ?? getGuestSessionId()) };
}

export async function getCart(sessionId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.cart.get, withSession(sessionId)).then(({ data }) => data)
  );
}

export async function addCartItem(payload, sessionId) {
  return handleServiceCall(
    axiosInstance.post(ENDPOINTS.cart.addItem, payload, withSession(sessionId)).then(({ data }) => data)
  );
}

export async function updateCartItem(variantId, payload, sessionId) {
  return handleServiceCall(
    axiosInstance
      .put(ENDPOINTS.cart.updateItem(variantId), payload, withSession(sessionId))
      .then(({ data }) => data)
  );
}

export async function removeCartItem(variantId, sessionId) {
  return handleServiceCall(
    axiosInstance
      .delete(ENDPOINTS.cart.removeItem(variantId), withSession(sessionId))
      .then(({ data }) => data)
  );
}

export async function clearCart(sessionId) {
  return handleServiceCall(
    axiosInstance.delete(ENDPOINTS.cart.clear, withSession(sessionId)).then(({ data }) => data)
  );
}

export async function mergeCart(sessionId) {
  const id = sessionId ?? getGuestSessionId();
  return handleServiceCall(
    axiosInstance
      .post(ENDPOINTS.cart.merge, { sessionId: id })
      .then(({ data }) => data)
  );
}
