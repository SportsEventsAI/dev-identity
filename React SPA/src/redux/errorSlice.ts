// src/redux/errorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    errors: { error: Error; errorInfo: React.ErrorInfo }[];
}

const initialState: ErrorState = {
    errors: [],
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        logError: (state, action: PayloadAction<{ error: Error; errorInfo: React.ErrorInfo }>) => {
            state.errors.push(action.payload);
        },
    },
});

export const { logError } = errorSlice.actions;
export default errorSlice.reducer;
