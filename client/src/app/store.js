import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from '../features/user/userSlice';
import stockReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        stock: stockReducer
    },
});

// setupListeners(store.dispatch);