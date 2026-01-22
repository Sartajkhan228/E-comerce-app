import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { MessageResponse, NewOrderRequest } from "../../types/api-types";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/` }),
    endpoints: (builder) => ({
        newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
            query: (order) => ({
                url: "new",
                method: "POST",
                body: order
            }),
        }),
        myOrders: builder.query<MessageResponse, string>({
            query: (id) => `my?id${id}`
        }),
        allOrders: builder.query({
            query: () => `all`
        })
    })
});


export const { useNewOrderMutation, useMyOrdersQuery, useAllOrdersQuery } = orderApi;