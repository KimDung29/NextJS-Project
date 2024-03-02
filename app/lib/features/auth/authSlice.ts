import { createSlice } from "@reduxjs/toolkit"

export type AuthState = {
    email: string | null,
    accessToken: string | null,
}

const initialState: AuthState = {
    email: '',
    accessToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.email = action.payload.userEmail;
            state.accessToken = action.payload.accessToken
        }
    }
});

export const {setAuth } = authSlice.actions;
export default authSlice.reducer;