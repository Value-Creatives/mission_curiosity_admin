import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/customerCategory";

export const addCustomerCategory = (formData) => {
    console.log(formData)
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getCustomerCategory = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getCustomerCategory?${query}`);
};

export const deleteCustomerCategoryById = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCustomerCategoryById = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
