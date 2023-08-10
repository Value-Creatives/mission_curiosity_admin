import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/client";

export const addClient = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addClient", formData);
};

export const getClient = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getClient?${query}`);
};

export const deleteClient = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateClient = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
