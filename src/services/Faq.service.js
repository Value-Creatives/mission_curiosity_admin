// Faq
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/FAQ";

export const addFaq = (formData) => {
  return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getFaq = (query) => {
  return axiosApiInstance.get(`${serverUrl}/`);
};

export const deleteFaq = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateFaq = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
