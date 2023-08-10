import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/privacy-policy";

export const addPrivacy = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/create", formData);
};

export const deletePrivacyById = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/delete/${id}`);
};

export const updatePrivacyById = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/update/${id}`, formData);
};

export const getPrivacys = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getAll?${query}`);
};



