import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/speaker";

export const addSpeaker = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addSpeaker", formData);
};

export const getSpeaker = () => {
  return axiosApiInstance.get(`${serverUrl}/getSpeaker`);
};

export const deleteSpeaker = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateSpeaker = (id, formData) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
