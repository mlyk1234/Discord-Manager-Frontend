import { IUser } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser;
}

const initialState: IUserState = {
  user: {
    emailAddress: '',
    role: '',
    rememberMe: false
  },
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
