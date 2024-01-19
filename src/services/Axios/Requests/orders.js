import { baseURL, handleResponse } from "../configs/Configs";

const getOrders = async (page = 1, limit = 5) => {
  try {
    const response = await baseURL.get(
      `/orders?_expand=user&&_expand=product&&_page=${page}&&_limit=${limit}`
    );
    const ordersLength = response.headers.get("X-Total-Count") || 0;
    return { data: response?.data, length: ordersLength };
  } catch (error) {
    throw error;
  }
};
const deleteOrder = async (orderID) => {
  try {
    const response = await baseURL.delete(`/orders/${orderID}`);
    return handleResponse(response, "order deleted succesfully");
  } catch (error) {
    throw error;
  }
};
export { getOrders, deleteOrder };
