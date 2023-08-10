import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/itenary";

export const addItenary = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/addItenary", formData);
};

export const deleteItenaryById = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateItenaryById = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getItenarys = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getItenary?${query}`);
};

export const bulkUpload = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/bulkUpload", formData);
};

export const bulkUpdateModelNo = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/bulkUpdateModelNo", formData);
};

export const getItenaryCount = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getItenaryCount?${query}`);
};


