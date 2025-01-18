import { axiosInstance } from './index';

export const LoginUser = async(value) => {
    console.log(value);
    try{
        const response = await axiosInstance.post('api/users/login', value);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export const RegisterUser = async(value) => {
    console.log(value);
    try{
        const response = await axiosInstance.post('api/users/register', value);
        return response.data;
    }catch(error){
        console.log(error);
    }
}