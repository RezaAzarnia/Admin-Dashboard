import { baseURL, handleResponse } from "../configs/Configs";
const getNotfications = async () => {
  try {
    const notifications = await baseURL.get("/notifications");
    return notifications.data.filter((item) => item.isRead == 0);
  } catch (error) {
    return error;
  }
};
const seeNotification = async (notifId) => {
  try {
    const response = await baseURL.patch(`/notifications/${notifId}`, {
      isRead: 1,
    });
    return handleResponse(response, "notif is read suucessfully");
  } catch (error) {
    return error;
  }
};
const seeAllNotificatios = async (notifications) => {
  for (let i = 0; i < notifications.length; i++) {
    const item = notifications[i];
    try {
      await baseURL.patch(`/notifications/${item.id}`, { isRead: 1 });
    } catch (error) {
      return error;
    }
  }
};
export { getNotfications, seeNotification, seeAllNotificatios };
