import axios from "axios";

export const getSystemInfos = () => {
  // 本地使用json server模拟接口
  // return axios.get("http://localhost:3000/info").then((res) => {
  return axios.get("/info").then((res) => {
    return res.data;
  });
};