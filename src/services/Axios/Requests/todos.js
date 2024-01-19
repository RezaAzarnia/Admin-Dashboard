import {
  baseURL,
  handleResponse,
  initialDate,
  initialTime,
} from "../configs/Configs";

const createTodo = async (todoTitle) => {
  try {
    const response = await baseURL.post("/todos", {
      todoTitle,
      isDone: false,
      todoDate: initialDate(),
      todoTime: initialTime(),
    });
    return handleResponse(response, "todo added");
  } catch (error) {
    throw error;
  }
};
const getTodos = async () => {
  try {
    const response = await baseURL.get("/todos");
    return response.data.reverse();
  } catch (error) {
    throw error;
  }
};
const changeTodoStatus = async (todoId, isDone) => {
  try {
    const response = await baseURL.patch(`/todos/${todoId}`, {
      isDone: !isDone,
    });
    return handleResponse(response, "todo isDone changed");
  } catch (error) {
    throw error;
  }
};
const deleteTodo = async (todoId) => {
  try {
    const response = await baseURL.delete(`/todos/${todoId}`);
    return handleResponse(response, "todo deleted");
  } catch (error) {
    throw error;
  }
};

export { createTodo, getTodos, changeTodoStatus, deleteTodo };
