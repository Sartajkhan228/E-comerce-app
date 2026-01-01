import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type { MessageResponse, UserResponse } from "../../types/api-types";
import type { User } from "../../types/types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/user/`
    }),
    endpoints: (builder) => ({
        // Define endpoints here
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user
            })
        })
    })
})


export const getUser = async (id: string) => {
    console.log("API FOR GETTING USER WITH ID")
    try {
        const { data }: { data: UserResponse } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/${id}`, {
            withCredentials: true
        });
        console.error("User data:", data);
        return data;

    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }


}


export const { useLoginMutation } = userApi;
