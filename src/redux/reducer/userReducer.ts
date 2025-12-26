import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserReducerInitialState } from "../../types/user-reducer";
import type { User } from "../../types/types";

const initialState: UserReducerInitialState = {
    user: null,
    loading: true
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExitst: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
        },
        userNotExitst: (state) => {
            state.loading = false;
            state.user = null;
        }
        // Define reducers here
    }
})

export const { userExitst, userNotExitst } = userReducer.actions;
export default userReducer;
