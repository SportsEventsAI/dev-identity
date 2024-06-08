// src/redux/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Updated to match the slice name
import errorReducer from './errorSlice'; // Added to the store
import { loggerMiddleware } from '../utils/logging';

/**
 * The Redux store for managing application state.
 * @filename src/redux/index.ts
 */
export const store = configureStore({
    reducer: {
        auth: authReducer, // Updated to match the slice name
        error: errorReducer, // Added to the store
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
