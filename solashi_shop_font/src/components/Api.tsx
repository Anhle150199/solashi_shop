import  Axios, { AxiosRequestConfig } from 'axios'
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
        console.log(message);
        console.log(error);
        console.log(process.env.BASE_URL);
        if(code !== '401')
        alert(message);
        
        // useNotificationStore.getState().addNotification({
        //     type: 'error',
        //     title: 'Error',
        //     message,
        // });

        return Promise.reject(error);
    }
);