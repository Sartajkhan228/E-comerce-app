export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    dob: string;
    gender: string;
    photo: string;
}


export type Product = {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
}

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string
}

export type CartItems = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

// all properties are added here like CartItems except stock and added mongodb id
export type OrderItems = Omit<CartItems, "stock"> & { _id: string }