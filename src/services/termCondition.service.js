import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/term-condition";

export const addCondition = (formData) => {
  console.log(formData)
  return axiosApiInstance.post(serverUrl + "/create", formData);
};

export const deleteConditionById = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/delete/${id}`);
};

export const updateConditionById = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/update/${id}`, formData);
};

export const getConditions = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getAll?${query}`);
};



