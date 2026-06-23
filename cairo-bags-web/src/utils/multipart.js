/**
 * Build multipart/form-data config. Omits JSON Content-Type so the browser sets the boundary.
 */
export function toMultipartConfig(extraHeaders = {}) {
  return {
    headers: {
      ...extraHeaders,
      "Content-Type": undefined,
    },
  };
}

export function appendProofFiles(formData, files) {
  if (!files) return formData;
  const list = Array.isArray(files) ? files : [files];
  list.forEach((file) => {
    if (file) formData.append("ProofFiles", file);
  });
  return formData;
}

export function buildPaymentProofFormData({ senderName, senderPhone, transactionReference, proofFiles }) {
  const formData = new FormData();
  formData.append("SenderName", senderName);
  formData.append("SenderPhone", senderPhone);
  formData.append("TransactionReference", transactionReference);
  appendProofFiles(formData, proofFiles);
  return formData;
}

export function buildFileUploadFormData(file) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}

export function buildProductImageUploadFormData(file, { altTextAr, altTextEn, isPrimary, sortOrder } = {}) {
  const formData = new FormData();
  formData.append("file", file);
  if (altTextAr != null) formData.append("AltTextAr", altTextAr);
  if (altTextEn != null) formData.append("AltTextEn", altTextEn);
  if (isPrimary != null) formData.append("IsPrimary", String(isPrimary));
  if (sortOrder != null) formData.append("SortOrder", String(sortOrder));
  return formData;
}
