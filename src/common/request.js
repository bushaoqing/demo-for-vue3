// axios 封装
import axios from "axios";

const BASEURL = "http://test.com"; // 默认前缀

export function request(o = {}) {
  return axios.create({
    baseURL: BASEURL,
    timeout: 10000, // 超时
    withCredentials: true // 允许跨域
  }).request(o)
}
