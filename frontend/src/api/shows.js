import axios from 'axios';
import { axiosInstance } from './index';

//add show
export const addNewShow = async(values) => {
    try{
        const response = await axiosInstance.post('api/shows/add-show', values);
        return response.data;
    } catch(error) {
        console.log(error);
    }
};

//add show by movie
export const addNewShowByMovie = async(id, values) => {
    try {
        if (!id) {
            throw new Error('Movie ID is required');
        }
        
        const response = await axiosInstance.post(`api/shows/add-show-by-movie/${id}`, values);
        return response.data;
    } catch (error) {
        // Proper error handling
        console.error('Error in addNewShowByMovie:', error);
        return {
            success: false,
            message: error.message || 'Failed to add show'
        };
    }
};

//get all shows by theatre
export const getAllShowsByTheatre = async(id) => {
    try{
        const response = await axiosInstance.get(`api/shows/all-shows-by-theatre/${id}`);
        return response.data;
    } catch(error){
        console.log(error);
    }
};

//update show
export const updateShow = async(id, values) => {
    try{
        const response = await axiosInstance.put(`api/shows/update-show/${id}`, values);
        return response.data;
    } catch(error){
        console.log(error)
    }
;}

//get all theatres by movie
export const allTheatresByMovie = async(id, date) => {
    try{
        const response = await axiosInstance.get(`api/shows/get-all-theatres-for-movie/${id}`, {params: {date}});
        return response.data;
    } catch(error) {
        console.log(error);
    }
}