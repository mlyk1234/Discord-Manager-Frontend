import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface IAuthState {
    access_token: string;
    expiresIn: number | null;
    milliseconds?: number | null;
}

const initialState: IAuthState = {
    access_token: '',
    expiresIn: null,
    milliseconds: null
}
export const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        setJWTAuth: (state, action: PayloadAction<IAuthState>) => {
            // axios.defaults.headers.Authorization = `Bearer ${action.payload.access_token}`;
            // state = {...action.payload};
            return {...action.payload}
        },
        clearToken: () => {
            return initialState;
        }
    },
});

export default authSlice.reducer;

export const { setJWTAuth, clearToken } = authSlice.actions;