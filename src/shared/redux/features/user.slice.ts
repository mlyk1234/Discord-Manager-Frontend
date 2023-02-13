import { IUser } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
        console.log('gettion', action)
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
