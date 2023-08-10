import axios from 'axios';
import { axiosApiInstance } from '../App';
import { url } from './url.service';
const serverUrl = `${url}/message`;

export const addMessage = async (chatId, obj) => {
    return await axiosApiInstance.post(`${serverUrl}/?fromAdmin=true&chatId=${chatId}`, obj);
};


export const getMessage = async (chatId) => {
    return await axiosApiInstance.get(`${serverUrl}/?fromAdmin=true&chatId=${chatId}`);
};
