import axios from 'axios';
import { BASE_URL } from './constants';

// Set config defaults when creating the instance
export const api = axios.create({
    baseURL: BASE_URL
});

// Add a request interceptor
api.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        const token = localStorage.getItem('token');

        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
