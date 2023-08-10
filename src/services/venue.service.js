import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/venue";

export const addVenue = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addVenue", formData);
};

export const getVenue = () => {
  return axiosApiInstance.get(`${serverUrl}/getVenue`);
};

export const deleteVenue = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteVenue/${id}`);
};

export const updateVenue = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateVenue/${id}`, formData);
};
