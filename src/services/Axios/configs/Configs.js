import axios from "axios";
const API_URL = " http://localhost:3000";
const baseURL = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response interceptor
baseURL.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code == "ECONNABORTED") {
      return Promise.reject("The request timed out. Please try again.");
    } else if (error.code == "ERR_NETWORK") {
      return Promise.reject("Network Error! Please try again later");
    } else {
      return Promise.reject(
        "An error occurred while processing your request. Please try again."
      );
    }
  }
);

const handleResponse = (response, responseMessage) => {
  if (response.status >= 200 && response.status < 300) {
    return { status: 200, message: responseMessage };
  } else {
    throw {
      status: response.status,
      message: response.statusText,
    };
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
  handleResponse,
  sanitizeData,
  initialDate,
  initialTime,
};
