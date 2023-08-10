import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/aboutus";

export const addAboutus = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addAboutus", formData);
};

export const getAboutus = () => {
  return axiosApiInstance.get(`${serverUrl}/getAboutus`);
};

export const deleteAboutus = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteAboutus/${id}`);
};

export const updateAboutus = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateAboutus/${id}`, formData);
};
