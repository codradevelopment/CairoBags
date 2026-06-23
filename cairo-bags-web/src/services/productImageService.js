import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import {
  buildProductImageUploadFormData,
  handleServiceCall,
  toMultipartConfig,
} from "../utils/index.js";

export async function getProductImages(productId) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.products.images(productId)).then(({ data }) => data)
  );
}

export async function uploadProductImage(productId, file, metadata = {}) {
  const formData = buildProductImageUploadFormData(file, metadata);
  return handleServiceCall(
    axiosInstance
      .post(ENDPOINTS.products.adminUploadImage(productId), formData, toMultipartConfig())
      .then(({ data }) => data)
  );
}

export async function uploadVariantImage(productId, variantId, file, metadata = {}) {
  const formData = buildProductImageUploadFormData(file, metadata);
  return handleServiceCall(
    axiosInstance
      .post(
        ENDPOINTS.products.adminUploadVariantImage(productId, variantId),
        formData,
        toMultipartConfig()
      )
      .then(({ data }) => data)
  );
}

export async function setPrimaryProductImage(productId, imageId) {
  return handleServiceCall(
    axiosInstance
      .put(ENDPOINTS.products.adminSetPrimary(productId, imageId))
      .then(({ data }) => data)
  );
}

export async function reorderProductImages(productId, payload) {
  return handleServiceCall(
    axiosInstance
      .put(ENDPOINTS.products.adminReorderImages(productId), payload)
      .then(({ data }) => data)
  );
}

export async function deleteProductImage(productId, imageId) {
  return handleServiceCall(
    axiosInstance.delete(ENDPOINTS.products.adminDeleteImage(productId, imageId))
  );
}
