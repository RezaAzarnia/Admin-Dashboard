import axios from "axios";
const API_URL = " http://localhost:3000";
const baseURL = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response, successMessage) => {
  if (navigator.onLine) {
    if (response.status >= 200 && response.status < 300) {
      return { status: 200, message: successMessage };
    } else {
      throw {
        status: response.status,
        message: response.statusText,
      };
    }
  } else {
    throw {
      status: 0,
      message: "Offline: Unable to connect to the server.",
    };
  }
};
const handleService = async (serviceFunction) => {
  try {
    const response = await serviceFunction;
    return response;
  } catch (error) {
    return [];
  }
};
//remove extra spaces in the data
const sanitizeData = (data) => {
  const trimedUsersData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
  return trimedUsersData;
};
// initial date with this format 2023/05/12
const date = new Date();
const initialDate = () => {
  return date.toISOString().slice(0, 10).replaceAll("-", "/");
};

const initialTime = () => {
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};
export {
  baseURL,
  handleService,
  handleResponse,
  sanitizeData,
  initialDate,
  initialTime,
};
