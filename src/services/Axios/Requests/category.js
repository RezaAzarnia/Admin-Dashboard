import {
  baseURL,
  handleResponse,
  sanitizeData,
} from "../configs/Configs";
let sanitizeCategoryData;

const addCategory = async (categoryData) => {
  sanitizeCategoryData = sanitizeData(categoryData);
  try {
    const response = await baseURL.post("/categories", {
      ...sanitizeCategoryData,
    });
    return handleResponse(response, "category added succesfully");
  } catch (error) {
    throw error;
  }
};

const categoryService = {
  getAllCategory: async () => {
    try {
      const response = await baseURL.get("/categories");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPaginatedCategory: async (page = 1, limit = 5) => {
    try {
      const response = await baseURL.get(
        `/categories?_page=${page}&&_limit=${limit}`
      );
      const categoriesLength = response.headers.get("X-Total-Count") || 0;
      return { data: response?.data, length: categoriesLength };
    } catch (error) {
      throw error;
    }
  },
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await baseURL.delete(`/categories/${categoryId}`);
    return handleResponse(response, "Category deleted successfully");
  } catch (error) {
    throw error;
  }
};

const editCategory = async (categoryId, categoryData) => {
  sanitizeCategoryData = sanitizeData(categoryData);
  try {
    const response = await baseURL.put(`/categories/${categoryId}`, {
      ...sanitizeCategoryData,
    });
    return handleResponse(response, "category edited succesfully");
  } catch (error) {
    throw error;
  }
};
export { categoryService, addCategory, deleteCategory, editCategory };
