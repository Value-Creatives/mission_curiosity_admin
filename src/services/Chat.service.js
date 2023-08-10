import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/chat";

export const getChats = () => {
    return axiosApiInstance.get(`${serverUrl}/`);
};

