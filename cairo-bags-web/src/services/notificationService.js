import axiosInstance from "../api/axios.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { handleServiceCall } from "../utils/index.js";

export async function getNotifications(params = {}) {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.notifications.list, { params }).then(({ data }) => data)
  );
}

export async function getUnreadCount() {
  return handleServiceCall(
    axiosInstance.get(ENDPOINTS.notifications.unreadCount).then(({ data }) => data)
  );
}

export async function markNotificationAsRead(id) {
  return handleServiceCall(axiosInstance.post(ENDPOINTS.notifications.markRead(id)));
}

export async function markAllNotificationsAsRead() {
  return handleServiceCall(axiosInstance.post(ENDPOINTS.notifications.markAllRead));
}
