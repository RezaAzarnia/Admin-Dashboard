import { baseURL, handleResponse } from "../configs/Configs";
const getUsersOrders = async () => {
  try {
    const response = await baseURL.get(
      "/orders?_expand=user&&_expand=product"
    );
    return response.data.reverse();
  } catch (error) {
    return error;
  }
};
const deleteOrder = async (orderID) => {
    try {
      const response = await baseURL.delete(`/orders/${orderID}`);
      return handleResponse(response, "order deleted succesfully");
    } catch (error) {
      return error;
    }
  };
export {getUsersOrders,deleteOrder}