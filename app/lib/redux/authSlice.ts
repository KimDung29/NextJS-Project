import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    accessToken: string | undefined,
    user: {
        name: string | null,
        email: string | null,
        id: string | null,
    }
}

const initialState: AuthState = {
    accessToken: '',
    user: {
        name: '',
        email: '',
        id: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.user.id = action.payload.user.id;
            state.user.email = action.payload.user.email;
            state.user.name = action.payload.user.name;
        }
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
