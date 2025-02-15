import axios from 'axios';
import { axiosInstance } from './index';

export const addTheatre = async(values) => {
    try{
        const response = await axiosInstance.post('api/theatres/add-theatre', values);
        return response.data;
    } catch(error) {
        console.log(error);
    }
};

export const getAllTheatres = async() => {
    try {
        const response = await axiosInstance.get('api/theatres/get-all-theatres');
        return response.data;
    } catch(error) {
        console.log(error);
    }
};

export const deleteTheatre = async(id) => {
    try {
        const response = await axiosInstance.delete(`api/theatres/delete-theatre/${id}`);
        return response.data;
    } catch(error) {
        console.log(error);
    }
};

export const updateTheatre = async(id, values) => {
    try {
        const response = await axiosInstance.put(`api/theatres/update-theatre/${id}`, values);
        return response.data;
    } catch(error) {
        console.log(error);
    }
};