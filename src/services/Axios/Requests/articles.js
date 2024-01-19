import {
  baseURL,
  handleResponse,
  initialDate,
  sanitizeData,
} from "../configs/Configs";

const getArticles = async (page = 1, limit = 5) => {
  try {
    const response = await baseURL.get(
      `/articles?_page=${page}&&_limit=${limit}`
    );
    const articlesLength = response.headers.get("X-Total-Count") || 0;
    return { data: response?.data, length: articlesLength };
  } catch (error) {
    throw error;
  }
};
const getSingleArticle = async (articleId) => {
  try {
    const response = await baseURL.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
        throw error;
  }
};

const addArticle = async (articleData) => {
  const sanitizeCategoryData = sanitizeData(articleData);

  try {
    const response = await baseURL.post("/articles", {
      ...sanitizeCategoryData,
      publishedDate: initialDate(),
      author: "Reza Azarnia",
    });
    return handleResponse(response, "article added succesfully");
  } catch (error) {
    throw error;
  }
};
const deleteArticle = async (articleID) => {
  try {
    const response = await baseURL.delete(`/articles/${articleID}`);
    return handleResponse(response, "article deleted succesfully");
  } catch (error) {
    throw error;
  }
};

export { addArticle, getArticles, deleteArticle, getSingleArticle };
