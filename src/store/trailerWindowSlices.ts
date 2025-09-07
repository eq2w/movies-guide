import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TrailerState {
    isOpen: boolean,
    url: string | null,
}
const initialState: TrailerState = {
    isOpen: false,
    url: null,
}
const trailerWindowSlice = createSlice({
    name: 'trailerWindow',
    initialState,
    reducers: {
        openTrailer: (state) => { state.isOpen = true },
        closeTrailer: (state) => {
            state.isOpen = false
            state.url = null
        },
        setUrlTrailer: (state, action: PayloadAction<string>) => { state.url = action.payload }
    }
})

export default trailerWindowSlice.reducer

export const { openTrailer, closeTrailer, setUrlTrailer } = trailerWindowSlice.actions