import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/userPi";


export const getUserPi = (query) => {
  return axiosApiInstance.get(`${serverUrl}/?${query}`);
};


export const getProductsSoldWithinDates = (date1, date2) => {
  return axiosApiInstance.get(`${serverUrl}/getProductsSoldWithinDates/${date1}/${date2}`);
};
export const getProductsSoldWithinDatesAndProductId = (date1, date2, id) => {
  return axiosApiInstance.get(`${serverUrl}/getProductsSoldWithinDatesAndProductId/${date1}/${date2}/${id}`);
};
export const getProductsSoldWithinDatesAndCouponId = (date1, date2, id) => {
  return axiosApiInstance.get(`${serverUrl}/getProductsSoldWithinDatesAndCouponId/${date1}/${date2}/${id}`);
};
export const getCouponsSoldWithinDates = (date1, date2) => {
  return axiosApiInstance.get(`${serverUrl}/getCouponsSoldWithinDates/${date1}/${date2}`);
};

export const getCustomerOrderByCustomerCategoryWithinDates = (date1, date2) => {
  return axiosApiInstance.get(`${serverUrl}/getCustomerOrderByCustomerCategoryWithinDates/${date1}/${date2}`);
};

export const getTotalUserPi = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getTotalUserPi?${query}`);
};

export const deleteUserPiData = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const AddUserPiData = (obj) => {
  return axiosApiInstance.post(`${serverUrl}/`, obj);
};

export const updateUserPiData = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
