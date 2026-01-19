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

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItems>) => {
            state.loading = true;

            const item = state.cartItems.find(i => i.productId === action.payload.productId);

            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.cartItems.push(action.payload);
            }
            state.loading = false
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
            state.loading = false
        },

        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },

        calculatePrice: (state) => {
            state.subTotal = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const taxPercent = 0.18
            state.tax = Math.round(state.subTotal * taxPercent);

            state.shippingCharges = state.subTotal > 1000 ? 0 : 200;

            state.total = state.subTotal + state.tax + state.shippingCharges - state.discount;

        }
    }

});

export const { addToCart, removeCartItem, discountApplied, calculatePrice } = cartReducer.actions;
export default cartReducer;