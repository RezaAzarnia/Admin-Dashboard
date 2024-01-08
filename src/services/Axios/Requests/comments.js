import {
  baseURL,
  handleResponse,
  initialDate,
  initialTime,
} from "../configs/Configs";

const getComments = async (page = 1, limit = 5) => {
  try {
    const comments = await baseURL.get(
      `/comments?_expand=product&&_page=${page}&&_limit=${limit}`
    );
    return comments;
  } catch (error) {
    return error;
  }
};
const deleteComment = async (commentId) => {
  try {
    const response = await baseURL.delete(`/comments/${commentId}`);
    return handleResponse(response, "comment deleted succesfully");
  } catch (error) {
    return error;
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
    return error;
  }
};
const rejectCommentById = async (commentId) => {
  try {
    const response = await baseURL.patch(`/comments/${commentId}`, {
      isAccept: 0,
    });
    return handleResponse(response, "comment rejected!!");
  } catch (error) {
    return error;
  }
};
const acceptCommentById = async (commentId) => {
  try {
    const response = await baseURL.patch(`/comments/${commentId}`, {
      isAccept: 1,
    });
    return handleResponse(response, "comment accepted!!");
  } catch (error) {
    return error;
  }
};

export {
  getComments,
  deleteComment,
  anwserComment,
  rejectCommentById,
  acceptCommentById,
};
