import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import {
  buildFileUploadFormData,
  handleServiceCall,
  resolveMediaUrl,
  toMultipartConfig,
} from "../utils/index.js";

export async function uploadFile(file) {
  const formData = buildFileUploadFormData(file);
  return handleServiceCall(
    axiosInstance
      .post(ENDPOINTS.file.upload, formData, toMultipartConfig())
      .then(({ data }) => data)
  );
}

/**
 * Generic upload flow for categories, products, and profile images.
 * Returns relative url for API payloads and absolute url for preview.
 */
export async function uploadImageAndGetUrl(file) {
  const { url } = await uploadFile(file);
  return {
    imageUrl: url,
    absoluteUrl: resolveMediaUrl(url),
  };
}
