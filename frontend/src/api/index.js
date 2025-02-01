import axios from 'axios'

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    baseURL: 'http://localhost:3000/',
    withCredentials: true
    // timeout: 1000,
  });


// // Add a request interceptor to dynamically add the token
