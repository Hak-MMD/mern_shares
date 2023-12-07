import { apiFetch } from '../../app/api/apiSlice'; 
import { setCredentials, logout, setWallet } from './userSlice';
import { store } from '../../app/store';
import axios from 'axios';


const register = async (credentials) => {

    try {
        await axios.post('http://localhost:3001/user/register', credentials, {withCredentials: true}).then((response) => {
            const accessToken = response.data.accessToken;
            const wallet = response.data.user.wallet;
            store.dispatch(setCredentials(accessToken));
            store.dispatch(setWallet(wallet));
        
        //     await apiFetch.get('http://localhost:3001/stock/getStocks', 
        //     // {
        //     //     headers: {
        //     //     Authorization: 'Bearer ' + accessToken //the token is a variable which holds the token
        //     // }
        //      // }
        // );
        });
    } catch (error) {
        console.log(error);
    }
};

const login = async (credentials) => {

    try {
        await axios.post('http://localhost:3001/user/login', credentials, { withCredentials: true }).then((response) => {
            const accessToken = response.data.accessToken;
            const wallet = response.data.user.wallet;
            store.dispatch(setCredentials(accessToken));
            store.dispatch(setWallet(wallet));        
        });
    } catch (error) {
        console.log(error);
    }
};

const refresh = async () => {
    try {
        await axios.get('http://localhost:3001/user/refresh', { withCredentials: true }).then((response) => {
            const accessToken = response.data.accessToken;
            store.dispatch(setCredentials(accessToken)); 
            return Promise.resolve(true);   
        });
    } catch (error) {
        console.log(error);
    }
};

const Logout = async () => {
    try {
        await axios.post('http://localhost:3001/user/logout', {}, { withCredentials: true }).then(() => {
            store.dispatch(logout());    
        });
    } catch (error) {
        console.log(error);
    }
};

const getMe = async () => {
    return apiFetch.get(`/user/getMe/`).then((response) => {
        store.dispatch(setWallet(response.data.wallet));
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

// export const usersApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         register: builder.mutation({
//             query: credentials => ({
//                 url: '/user/register',
//                 method: 'POST',
//                 body: { ...credentials }
//             })
//         }),
//         login: builder.mutation({
//             query: credentials => ({
//                 url: '/user/login',
//                 method: 'POST',
//                 body: { ...credentials }
//             })
//         })
//     })
// });


export {
    register,
    login,
    refresh,
    Logout,
    getMe
}