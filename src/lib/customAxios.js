import axios, { AxiosInstance } from "axios";

const token = window.localStorage.getItem("token");
const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;

// 토큰 유효성 검사 필요 api
export const authAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

// 토큰 유효성 검사 불필요 api
export const notAuthAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodoApi = () => {
  return authAxios.get("/todos");
};

export const postTodoApi = (text) => {
  return authAxios.post("/todos", { todo: text });
};
export const deleteTodoApi = (todo_id) => {
  return authAxios.delete(`/todos/${todo_id}`);
};

export const updatedTodoApi = (todo_id, todo, isCompleted) => {
  return authAxios.put(`/todos/${todo_id}`, {
    todo,
    isCompleted,
  });
};
export const postMemberApi = (id, pw) => {
  return notAuthAxios.post("/auth/signup", {
    email: id,
    password: pw,
  });
};

export const setAuthAxiosHeaders = (token) => {
  authAxios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const loginMemberApi = (id, pw) => {
  return notAuthAxios.post("/auth/signin", {
    email: id,
    password: pw,
  });
};
