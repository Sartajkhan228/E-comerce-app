
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { userApi } from "./api/userApi";
import userReducer from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER_URL;

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userReducer.name]: userReducer.reducer
    },
    middleware: (mid) => [...mid(), userApi.middleware, productApi.middleware]
});
