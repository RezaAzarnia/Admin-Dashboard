import { baseURL, handleResponse, sanitizeData } from "../configs/Configs";
let sanitizeCategoryData;



const addCategory = async (categoryData) => {
  sanitizeCategoryData = sanitizeData(categoryData);
  try {
    const response = await baseURL.post("/categories", { ...sanitizeCategoryData });
    return handleResponse(response, "category added succesfully");
  } catch (error) {
    return error;
  }
};

const getCategory = async () => {
  try {
    const response = await baseURL.get("/categories");
    return response.data.reverse();
  } catch (error) {
    return error;
  }
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
export { getCategory, addCategory, deleteCategory, editCategory };
