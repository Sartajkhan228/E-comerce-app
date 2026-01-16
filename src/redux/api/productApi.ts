import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllProductsResponse, CategoriesResponse, deleteProductRequest, MessageResponse, NewProductRequestBody, ProductDetailsResponse, SearchProductsRequest, SearchProductsResponse, updateProductRequest } from "../../types/api-types";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/` }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        // End points
        getLatestProducts: builder.query<AllProductsResponse, string>({
            query: () => ({
                url: "latest",
                method: "GET"
            }),
            providesTags: ["Product"],
        }),
        getAllProducts: builder.query<AllProductsResponse, string>({
            query: (id) => ({
                url: `admin-products?id=${id}`,
                method: 'GET'
            }),
            providesTags: ["Product"],
        }),
        categories: builder.query<CategoriesResponse, string>({
            query: () => ({
                url: `categories`,
                method: 'GET'
            }),
            providesTags: ["Product"],
        }),
        getSearchedProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({ page, price, category, search, sort }) => {
                let base = `search?search=${search}&page=${page}`

                if (price) { base += `&price=${price}` };

                if (category) { base += `&category=${category}` };

                if (sort) { base += `&sort=${sort}` };

                return base;
            },
            providesTags: ["Product"],
        }),
        productDetails: builder.query<ProductDetailsResponse, string>({
            query: (id) => id,
            providesTags: ["Product"],
        }),

        createProduct: builder.mutation<MessageResponse, NewProductRequestBody>({
            query: ({ formData, id }) => ({
                url: `all?id=${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation<MessageResponse, updateProductRequest>({
            query: ({ formData, userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation<MessageResponse, deleteProductRequest>({
            query: ({ userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Product"],
        }),
    })
})

export const { useGetLatestProductsQuery, useGetAllProductsQuery, useCategoriesQuery, useGetSearchedProductsQuery, useCreateProductMutation, useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation } = productApi;

