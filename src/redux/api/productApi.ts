import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllProductsResponse, CategoriesResponse, MessageResponse, NewProductRequestBody, SearchProductsRequest, SearchProductsResponse } from "../../types/api-types";


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
        getSearchedProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({ page, price, category, search, sort }) => {
                let base = `search?search=${search}&page=${page}`

                if (price) { base += `&price=${price}` };

                if (category) { base += `&category=${category}` };

                if (sort) { base += `&sort=${sort}` };

                return base;
            },
        }),
        createProduct: builder.mutation<MessageResponse, NewProductRequestBody>({
            query: ({ formData, id }) => ({
                url: `all?id=${id}`,
                method: 'POST',
                body: formData,
            }),
        }),
    })
})

export const { useGetLatestProductsQuery, useGetAllProductsQuery, useCategoriesQuery, useGetSearchedProductsQuery, useCreateProductMutation } = productApi;

