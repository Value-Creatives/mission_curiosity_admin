import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/book-now";

export const getBooknow = () => {
  return axios.get(`${serverUrl}/getBookCall`);
};


export const getById = (id) => {
  return axios.get(`${serverUrl}/getById/${id}`);
};

export const deleteBooknow = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};