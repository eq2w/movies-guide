import { configureStore } from "@reduxjs/toolkit";
import authWindowReducer from './authWindowSlices'
import authReducer from './authSlices'
import trailerWindowReducer from './trailerWindowSlices'

const store = configureStore({
    reducer: {
        authWindow: authWindowReducer,
        auth: authReducer,
        trailerWindow: trailerWindowReducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>