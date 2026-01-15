import type { Product, User } from "./types";


export type MessageResponse = {
    success: boolean;
    message: string;
}

export type CustomeError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    }
}

export type UserResponse = {
    success: boolean;
    user: User;
}

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
}

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
}

export type SearchProductsResponse = AllProductsResponse & {
    totalPages: number;
}

export type SearchProductsRequest = {
    page: number;
    price: number;
    category?: string;
    search?: string;
    sort?: string;
}

export type NewProductRequestBody = {
    id: string;
    formData: FormData;
}