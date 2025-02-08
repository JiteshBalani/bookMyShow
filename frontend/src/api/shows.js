import axios from 'axios';
import { axiosInstance } from './index';

//add show
const addNewShow = async(values) => {
    try{
        const response = await axiosInstance.post('api/shows/add-show', values);
        return response.data;
    } catch(error) {
        console.log(error);
    }
};

//get all shows by theatre
const getAllShowsByTheatre = async(id) => {
    try{
        const response = await axiosInstance.get(`api/shows/all-shows-by-theatre/${id}`);
        return response.data;
    } catch(error){
        console.log(error);
    }
};

//update show
const updateShow = async(id, values) => {
    try{
        const response = await axiosInstance.put(`api/shows/update-show/${id}`, values);
        return response.data;
    } catch(error){
        console.log(error)
    }
;}

//get all theatres by movie
const allTheatresByMovie = async(id) => {
    try{
        const response = await axiosInstance.get(`api/shows/get-all-theatres-for-movie/${id}`);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}