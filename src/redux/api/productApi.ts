import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllProductsResponse } from "../../types/api-types";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/product/` }),
    endpoints: (builder) => ({
        // End points
        getLatestProducts: builder.query<AllProductsResponse, string>({
            query: () => ({
                url: "latest",
                method: "GET"
            })
        }),
        getAllProducts: builder.query<AllProductsResponse, string>({
            query: (id) => ({
                url: `admin-products?id=${id}`,
                method: 'GET'
            })
        }),

    })
})

export const { useGetLatestProductsQuery, useGetAllProductsQuery } = productApi;

