import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/request-call";

export const getRequestCall = () => {
  return axios.get(`${serverUrl}/getRequestCall`);
};

export const deleteRequestCall = (id) => {
  return axios.delete(`${serverUrl}/deleteRequestCall/${id}`);
};

export const getById = (id) => {
  return axios.get(`${serverUrl}/getById/${id}`);
};