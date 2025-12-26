import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MessageResponse } from "../../types/api-types";
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


export const { useLoginMutation } = userApi;
