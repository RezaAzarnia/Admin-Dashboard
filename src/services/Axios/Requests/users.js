import {
  baseURL,
  handleResponse,
  initialDate,
  sanitizeData,
} from "../configs/Configs";

let sanitizeUserData = {};

const usersService = {
  getAllUsers: async () => {
    const response = await baseURL.get(`/users`);
    return response.data;
  },
  getPaginatedUsers: async (page = 1, limit = 5) => {
    const response = await baseURL.get(`/users?_page=${page}&&_limit=${limit}`);
    return response;
  },
};
const checkExistUser = async (user) => {
  const users = await getUsers();
  const isUserExist = users?.some(
    (oldUsers) => oldUsers.userEmail === user.userEmail
  );
  if (isUserExist) {
    throw {
      status: 409,
      message: "This email is already registered.",
    };
  }
};

const addUser = async (userData) => {
  sanitizeUserData = sanitizeData(userData);
  try {
    await checkExistUser(sanitizeUserData);
    const response = await baseURL.post("/users", {
      ...sanitizeUserData,
      registerDate: initialDate(),
      role: "user",
    });
    return handleResponse(response, "user added succesfully");
  } catch (error) {
    return error;
  }
};

const editUser = async (userID, userData, isUserEmailChanged) => {
  sanitizeUserData = sanitizeData(userData);
  try {
    //check if email value  changed => check user existense
    if (isUserEmailChanged) {
      await checkExistUser(sanitizeUserData);
    }
    const response = await baseURL.put(`/users/${userID}`, {
      ...sanitizeUserData,
    });
    return handleResponse(response, "user edited succesfully");
  } catch (error) {
    return error;
  }
};

const deleteUser = async (userID) => {
  try {
    const response = await baseURL.delete(`/users/${userID}`);
    return handleResponse(response, "user deleted succesfully");
  } catch (error) {
    return error;
  }
};

export { addUser, usersService, editUser, deleteUser };
