import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartReducerInitialState } from "../../types/user-reducer";
import type { CartItems } from "../../types/types";


const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    }
};

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItems>) => {
            state.loading = true;
            state.cartItems.push(action.payload);
            state.loading = false
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
            state.loading = false
        }
    }
})

export const { addToCart, removeCartItem } = cartReducer.actions;
export default cartReducer;