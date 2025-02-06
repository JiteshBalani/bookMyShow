import axios from 'axios';
import { axiosInstance } from './index';

export const getAllMovies = async() => {
    try{
        const response = await axiosInstance.get('api/movies/get-all-movies');
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export const addMovie = async(values) => {
    try{
        const response = await axiosInstance.post('api/movies/add-movie', values);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export const updateMovie = async(id, values) => {
    try {
        const response = await axiosInstance.put(`api/movies/update-movie/${id}`, values);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export const deleteMovie = async(id) => {
    try {
        const response = await axiosInstance.delete(`api/movies/delete-movie/${id}`);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}