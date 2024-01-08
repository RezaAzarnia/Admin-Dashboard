import {
  baseURL,
  handleResponse,
  handleService,
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
    return error;
  }
};

const categoryService = {
  getAllCategory: async () => {
    const response = await handleService(baseURL.get("/categories"));
    return response.data;
  },
  getPaginatedCategory: async (page = 1, limit = 5) => {
    const response = await handleService(
      `/categories?_page=${page}&&_limit=${limit}`
    );
    return response;
  },
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await baseURL.delete(`/categories/${categoryId}`);
    return handleResponse(response, "Category deleted successfully");
  } catch (error) {
    return error;
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
    return error;
  }
};
export { categoryService, addCategory, deleteCategory, editCategory };
