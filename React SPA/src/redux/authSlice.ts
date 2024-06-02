// src/store/authSlice.ts
import { AccountInfo } from '@azure/msal-browser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
    isAuthenticated: boolean;
    user: AccountInfo | null; // Adjust the type as necessary
    token: string | null;
}

const initialState: IAuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

/**
 * Represents the authentication slice of the Redux store.
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Updates the state to indicate a successful login.
         * @param state - The current state.
         * @param action - The login success action containing the user and token.
         */
        login(state, action: PayloadAction<{ user: AccountInfo | null; token: string | null }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        /**
         * Updates the state to indicate a successful logout.
         * @param state - The current state.
         */
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        resetPassword: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout, resetPassword } = authSlice.actions;
export default authSlice.reducer;
