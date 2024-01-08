import { baseURL, handleResponse, handleService } from "../configs/Configs";
const ordersService = {
  getAllOrders: async () => {
    const response = await baseURL.get(`/orders?_expand=user&&_expand=product`);
    return response.data;
  },
  getPaginatedOrders: async (page = 1, limit = 5) => {
    const response = await handleService(
      `/orders?_expand=user&&_expand=product&&_page=${page}&&_limit=${limit}`
    );
    return response;
  },
};
const deleteOrder = async (orderID) => {
  try {
    const response = await baseURL.delete(`/orders/${orderID}`);
    return handleResponse(response, "order deleted succesfully");
  } catch (error) {
    return error;
  }
};
export { ordersService, deleteOrder };
