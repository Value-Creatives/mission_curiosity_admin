import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/systemSetting";

export const getSystemSetting = (query) => {
    return axiosApiInstance.get(`${serverUrl}/get?${query}`);
};

export const updateSystemSetting = (id, formData) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};


