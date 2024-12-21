import { createSlice } from "@reduxjs/toolkit";

interface loadingState {
    isLoading: boolean;
}

const loadingValue: loadingState = {
    isLoading: false
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState: loadingValue,
    reducers: {
        toggle_loading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const { toggle_loading } = loadingSlice.actions;

export default loadingSlice.reducer;