import { STORAGE_KEYS } from "../constants/index.js";

function generateUuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getGuestSessionId() {
  let sessionId = localStorage.getItem(STORAGE_KEYS.GUEST_SESSION_ID);
  if (!sessionId) {
    sessionId = generateUuid();
    localStorage.setItem(STORAGE_KEYS.GUEST_SESSION_ID, sessionId);
  }
  return sessionId;
}

export function clearGuestSessionId() {
  localStorage.removeItem(STORAGE_KEYS.GUEST_SESSION_ID);
}

export function buildSessionHeaders(sessionId = getGuestSessionId()) {
  if (!sessionId) return {};
  return { "X-Session-Id": sessionId };
}
