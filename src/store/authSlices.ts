import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../api/User";

interface AuthState {
    data: User | null
}
const initialState: AuthState = {
    data: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.data = action.payload
        },
        clearUser: (state) => {
            state.data = null
        }
    }
})

export default authSlice.reducer

export const { setUser, clearUser } = authSlice.actions