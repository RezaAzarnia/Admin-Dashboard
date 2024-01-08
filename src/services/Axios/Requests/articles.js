import {
  baseURL,
  handleResponse,
  handleService,
  initialDate,
  sanitizeData,
} from "../configs/Configs";

const articleService = {
  getAllArticles: async () => {
    const response = await handleService(baseURL.get("/articles"));
    return response.data;
  },
  getPaginatedArticles: async (page = 1, limit = 5) => {
    return await handleService(`/articles?_page=${page}&&_limit=${limit}`);
  },
};

const getSingleArticle = async (articleId) => {
  try {
    const response = await baseURL.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    return error;
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
    return error;
  }
};
const deleteArticle = async (articleID) => {
  try {
    const response = await baseURL.delete(`/articles/${articleID}`);
    return handleResponse(response, "article deleted succesfully");
  } catch (error) {
    return error;
  }
};

export { addArticle, articleService, deleteArticle, getSingleArticle };
