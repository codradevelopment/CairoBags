import { STORAGE_KEYS } from "../constants/index.js";

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function getStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAccessToken(token) {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }
}

export function setRefreshToken(refreshToken) {
  if (refreshToken) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
}

export function persistAuthSession({ token, refreshToken, user }) {
  if (token) setAccessToken(token);
  if (refreshToken) setRefreshToken(refreshToken);
  if (user) setStoredUser(user);
}

export function clearAuthStorage() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function isAdmin(user = getStoredUser()) {
  const roles = user?.role ?? user?.Role ?? [];
  return Array.isArray(roles) && roles.includes("Admin");
}

export function isCustomer(user = getStoredUser()) {
  const roles = user?.role ?? user?.Role ?? [];
  return Array.isArray(roles) && roles.includes("Customer");
}
