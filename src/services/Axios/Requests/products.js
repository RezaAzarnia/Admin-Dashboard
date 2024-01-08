import {
  baseURL,
  handleResponse,
  initialDate,
  sanitizeData,
} from "../configs/Configs";
let sanitizeProductData;

const productService = {
  getAllProducts: async () => {
    const response = await baseURL.get(
      `/products?_expand=category`
    );
    return response.data;
  },
  getPaginatedProducts: async (page = 1, limit = 5) => {
    const response = await handleService(
      `/products?_expand=category&&_page=${page}&&_limit=${limit}`
    );
    return response;
  },
};

const getSingleProduct = async (productId) => {
  try {
    const response = await baseURL.get(
      `/products/${productId}?_embed=comments`
    );

    return response.data;
  } catch (error) {
    return error;
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
    return error;
  }
};
const addDiscount = async (productID, productDiscount) => {
  try {
    const response = await baseURL.patch(`/products/${productID}`, {
      productDiscount,
    });
    return handleResponse(response, "discount added succesfully");
  } catch (error) {
    return error;
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
    return error;
  }
};

const deleteProduct = async (productID) => {
  try {
    const response = await baseURL.delete(`/products/${productID}`);
    return handleResponse(response, "product deleted succesfully");
  } catch (error) {
    return error;
  }
};
export {
  addProduct,
  productService,
  getSingleProduct,
  deleteProduct,
  editProduct,
  addDiscount,
};
