import { createSlice } from "@reduxjs/toolkit";

const authWindowSlice = createSlice({
    name: 'authWindow',
    initialState: false,
    reducers: {
        openAuth: () => true,
        closeAuth: () => false,
    }
})

export default authWindowSlice.reducer

export const { openAuth, closeAuth } = authWindowSlice.actions