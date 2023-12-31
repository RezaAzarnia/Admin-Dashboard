import { baseURL, handleResponse, initialDate, sanitizeData } from "../configs/Configs";

const getArticles = async () => {
  try {
    const response = await baseURL.get("/articles");
    return response.data || [];
  } catch (error) {
    return [];
  }
};
const getSingleArticle = async (articleId) => {
  try {
    const response = await baseURL.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const checkExistArticle = async (newArticle) => {
  const articles = await getArticles();
  const isArticleExist = articles?.some(
    (article) => article.articleTitle === newArticle.articleTitle
  );
  if (isArticleExist) {
    throw {
      status: 409,
      message: "This article title is already registered.",
    };
  }
};
const addArticle = async (articleData) => {
  const sanitizeCategoryData = sanitizeData(articleData);

  try {
    await checkExistArticle(articleData);
    const response = await baseURL.post("/articles", {
      ...sanitizeCategoryData,
      publishedDate: initialDate(),
      author:'Reza Azarnia'
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

export { addArticle, getArticles, deleteArticle, getSingleArticle };
