import type { CartItems, Order, Product, ShippingInfo, User } from "./types";


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

export type ProductDetailsResponse = {
    success: boolean;
    product: Product;
}

export type NewProductRequestBody = {
    id: string;
    formData: FormData;
}
export type updateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
}
export type deleteProductRequest = {
    userId: string;
    productId: string;
}

// order api routes types:

export type AllOrderResponse = {
    success: boolean;
    orders: Order[];
}

export type OrderDetailsResponse = {
    success: boolean;
    orders: Order[];
}

export type NewOrderRequest = {
    user: string;
    shippingInfo: ShippingInfo;
    oderItems: CartItems[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number
}

export type NewOrderRequestBody = {
    id: string;
    formData: FormData;
}

export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
}

export type DeleteOrderRequest = {
    userId: string;
    orderId: string;
}