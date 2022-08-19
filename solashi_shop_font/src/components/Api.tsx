import  Axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify';
import { ToastError } from './header/Toast';
function authRequestInterceptor(config: AxiosRequestConfig) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers ={
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        };
    } else {
        config.headers = {
            "Accept": "application/json",
        }
    }
    return config;
}

export const Api = Axios.create({
    baseURL: "http://localhost:8000/api",
});

Api.interceptors.request.use(authRequestInterceptor);
Api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        const code = error.response.status;
        console.log(error);
        ToastError(message);
        return Promise.reject(error);
    }
);