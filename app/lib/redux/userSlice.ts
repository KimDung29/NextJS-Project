import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    name: string | null,
    email: string | null,
    id: string | null,
}

const initialState: UserState = {
    name: '',
    email: '',
    id: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
