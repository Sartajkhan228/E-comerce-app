
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";

export const server = import.meta.env.VITE_SERVER_URL;

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (mid) => [...mid(), userApi.middleware]
});
