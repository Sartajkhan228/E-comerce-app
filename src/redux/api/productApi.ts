import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllProductsResponse, CategoriesResponse, SearchProductsResponse } from "../../types/api-types";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/` }),
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
        categories: builder.query<CategoriesResponse, string>({
            query: () => ({
                url: `categories`,
                method: 'GET'
            })
        }),
        getSearchedProducts: builder.query<SearchProductsResponse, string>({
            query: (id) => ({
                url: `all?id=${id}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetLatestProductsQuery, useGetAllProductsQuery, useCategoriesQuery } = productApi;

