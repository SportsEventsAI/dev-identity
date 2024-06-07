// src/store/errorSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface ErrorState {
    error: any;
}

const initialState: ErrorState = {
    error: null,
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
