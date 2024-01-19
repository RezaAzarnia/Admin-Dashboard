import {
  baseURL,
  handleResponse,
  initialDate,
} from "../configs/Configs";

const getComments = async (page = 1, limit = 5) => {
  try {
    const response = await baseURL.get(
      `/comments?_expand=product&&_page=${page}&&_limit=${limit}`
    );
    const commentsLength = response.headers.get("X-Total-Count") || 0;
    return { data: response?.data || [], length: commentsLength };
  } catch (error) {
    throw error;
  }
};
const deleteComment = async (commentId) => {
  try {
    const response = await baseURL.delete(`/comments/${commentId}`);
    return handleResponse(response, "comment deleted succesfully");
  } catch (error) {
    throw error;
  }
};

const anwserComment = async (commentId, anwser) => {
  try {
    const response = await baseURL.patch(`/comments/${commentId}`, {
      anwser,
      anwserDate: initialDate(),
    });
    return handleResponse(response, "anwser added succesfully");
  } catch (error) {
    throw error;
  }
};
const rejectCommentById = async (commentId) => {
  try {
    const response = await baseURL.patch(`/comments/${commentId}`, {
      isAccept: 0,
    });
    return handleResponse(response, "comment rejected!!");
  } catch (error) {
    throw error;
  }
};
const acceptCommentById = async (commentId) => {
  try {
    const response = await baseURL.patch(`/comments/${commentId}`, {
      isAccept: 1,
    });
    return handleResponse(response, "comment accepted!!");
  } catch (error) {
    throw error;
  }
};

export {
  getComments,
  deleteComment,
  anwserComment,
  rejectCommentById,
  acceptCommentById,
};
