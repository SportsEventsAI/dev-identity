// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Updated to match the slice name

/**
 * The Redux store for managing application state.
 */
const store = configureStore({
    reducer: {
        auth: authReducer, // Updated to match the slice name
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
