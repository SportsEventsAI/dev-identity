/**
 * @file src/redux/errorSlice.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Errorslice
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the errorslice related logic.
 * @author Geoffrey DeFilippi
 */

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
