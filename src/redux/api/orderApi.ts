import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { AllOrderResponse } from "../../types/api-types";


export const orderApi = createApi({

    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/` }),
    endpoints: (builder) => ({
        getOders: builder.query<AllOrderResponse, string>({
            query: () => ({
                url: "",
                method: "GET"
            }),
        }),

    })
})