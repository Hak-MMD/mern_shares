// import { setCredentials } from '../../features/user/userSlice'
import axios from 'axios';
import { selectCurrentToken } from '../../features/user/userSlice';
import { store } from '../store';
// import jwt from 'jsonwebtoken';
import { refresh } from '../../features/user/userApiSlice';




const apiFetch = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: `Bearer ${store.getState().user.token}`
    },
    withCredentials: true
}
);
apiFetch.interceptors.request.use((request) => {
    // console.log('req log');
    request.headers.Authorization = `Bearer ${store.getState().user.token}`
    return request;
}, (error) => {
    return Promise.reject(error);
});

apiFetch.interceptors.response.use((response) => {
    // console.log('got response');
    return response;
},
(error) => {

    if (error?.response?.status === 403) {
        return refresh().then(() => {
            error.config.headers['Authorization'] = 'Bearer ' + store.getState().user.token;
            // error.config.baseURL = undefined;
            return axios.request(error.config);
        });
    }
    return Promise.reject(error)
})



export {
    apiFetch,
}