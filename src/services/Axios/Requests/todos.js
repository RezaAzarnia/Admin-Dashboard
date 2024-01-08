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
      userId: 1,
    });
    return handleResponse(response, "todo added");
  } catch (error) {
    return error;
  }
};
const getTodos = async () => {
  try {
    const response = await baseURL.get("/todos");
    return response.data.reverse();
  } catch (error) {
    return error;
  }
};
const changeTodoStatus = async (todoId, isDone) => {
  try {
    const response = await baseURL.patch(`/todos/${todoId}`, {
      isDone: !isDone,
    });
    return handleResponse(response, "todo isDone changed");
  } catch (error) {
    return error;
  }
};
const deleteTodo = async (todoId) => {
  try {
    const response = await baseURL.delete(`/todos/${todoId}`);
    return handleResponse(response, "todo deleted");
  } catch (error) {
    return error;
  }
};

export { createTodo, getTodos, changeTodoStatus, deleteTodo };
