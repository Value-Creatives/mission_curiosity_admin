import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/contacts";

export const getContact = () => {
  return axios.get(`${serverUrl}/getContact`);
};

export const getById = (id) => {
  return axios.get(`${serverUrl}/getById/${id}`);
};

export const deleteContact = (id) => {
  return axios.delete(`${serverUrl}/deleteContact/${id}`);
};