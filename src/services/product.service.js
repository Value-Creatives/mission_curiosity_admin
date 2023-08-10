import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/product";

export const addProduct = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/addProduct", formData);
};

export const deleteProductById = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateProductById = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getProducts = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getProducts?${query}`);
};



export const bulkUpload = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/bulkUpload", formData);
};

export const bulkUpdateModelNo = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/bulkUpdateModelNo", formData);
};

export const getProductCount = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getProductCount?${query}`);
};


