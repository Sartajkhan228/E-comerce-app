export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    dob: string;
    gender: string;
    photo: string;
}


export interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
}