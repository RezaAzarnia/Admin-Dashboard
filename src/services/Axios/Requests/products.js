import {
  baseURL,
  handleResponse,
  initialDate,
  sanitizeData,
} from "../configs/Configs";
let sanitizeProductData;

const getProducts = async (page = 1, limit = 5) => {
  try {
    const response = await baseURL.get(
      `/products?_expand=category&&_page=${page}&&_limit=${limit}`
    );
    const productsLength = response.headers.get("X-Total-Count") || 0;
    return { data: response?.data || [], length: productsLength };
  } catch (error) {
    throw error;
  }
};
const getSingleProduct = async (productId) => {
  try {
    const response = await baseURL.get(
      `/products/${productId}?_embed=comments`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (productData) => {
  sanitizeProductData = sanitizeData(productData);
  try {
    const response = await baseURL.post("/products", {
      ...sanitizeProductData,
      productDiscount: 0,
      createdDate: initialDate(),
    });
    return handleResponse(response, "product added succesfully");
  } catch (error) {
    throw error;
  }
};
const addDiscount = async (productID, productDiscount) => {
  try {
    const response = await baseURL.patch(`/products/${productID}`, {
      productDiscount,
    });
    return handleResponse(response, "discount added succesfully");
  } catch (error) {
    throw error;
  }
};
const editProduct = async (productID, productData) => {
  console.log(productData);
  sanitizeProductData = sanitizeData(productData);
  try {
    const response = await baseURL.put(`/products/${productID}`, {
      ...sanitizeProductData,
    });
    return handleResponse(response, "product edited succesfully");
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productID) => {
  try {
    const response = await baseURL.delete(`/products/${productID}`);
    return handleResponse(response, "product deleted succesfully");
  } catch (error) {
    throw error;
  }
};
export {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  editProduct,
  addDiscount,
};
