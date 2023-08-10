import axios from "axios";
import jwtDecode from "jwt-decode";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/users";

export const getDecodedToken = async () => {
  let token = await localStorage.getItem("token");
  if (token) return await jwtDecode(token);
  else return null;
};

export const login = (formData) => {
  return axiosApiInstance.post(serverUrl + "/loginAdmin", formData);
};

export const addUser = (formData) => {
  return axiosApiInstance.post(serverUrl + "/register", formData);
};

export const getRegisteredUsersBetweeenDays = (date1, date2) => {
  return axiosApiInstance.get(`${serverUrl}/getRegisteredUsersBetweeenDays/${date1}/${date2}`);
};
export const getTotalUser = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getTotalUsers?${query}`);
};
export const getUser = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getUsers`);
};

export const StatusChange = async (id, data) => {
  return await axiosApiInstance.patch(`${serverUrl}/updateUserStatus/${id}`, data);
};

export const updateUserStatus = (id, formData) => {
  return axiosApiInstance.patch(`${serverUrl}/updateUserStatus/${id}`, formData);
};
export const updateUserCategory = (id, formData) => {
  return axiosApiInstance.patch(`${serverUrl}/updateUserCategory/${id}`, formData);
};

export const updateUserKycStatus = (id, formData) => {
  return axiosApiInstance.patch(`${serverUrl}/updateUserKycStatus/${id}`, formData);
};

export const deleteUser = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const getSpecificCustomer = (value) => {
  return axiosApiInstance.get(`${serverUrl}/getSpecificCustomer?search=${value}`);
};

export const getById = (id) => {
  return axiosApiInstance.get(`${serverUrl}/getById/${id}`);
};

export const updateUser = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
