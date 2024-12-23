import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";

interface UserState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout(state) {
            state.user = null;
            state.isAuth = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
