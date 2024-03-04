import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    userName: string ,
    email: string ,
    accessToken: string ,
}

const initialState: AuthState = {
    userName: '',
    email: '',
    accessToken: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
        }
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
