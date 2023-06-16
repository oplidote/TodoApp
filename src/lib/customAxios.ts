import axios, { AxiosInstance } from "axios";

const token = window.localStorage.getItem("token");
const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;
// 토큰 유효성 검사 필요 api
export const authAxios: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 토큰 유효성 검사 불필요 api
export const notAuthAxios: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postMemberApi = async (id: string, pw: string) => {
  const res = await notAuthAxios.post("/auth/signup", {
    email: id,
    password: pw,
  });
};
export const loginMemberApi = async (id: string, pw: string) => {
  const res = await notAuthAxios.post("/auth/signin", {
    email: id,
    password: pw,
  });
  window.localStorage.setItem('token', res.data.access_token);
};
