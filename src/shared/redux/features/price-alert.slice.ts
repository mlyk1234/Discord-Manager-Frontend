import { IUser } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPriceAlert {
    id: number,
    watch: string,
    price_target: number,
    trigger_once: boolean,
    condition: string,
    channel: string,
    enabled: boolean,
    status: string,
    userId: number,
    createdDate: Date,
    updatedDate: Date
}

const initialState: IPriceAlert[] = [];

export const priceAlertSlice = createSlice({
  initialState,
  name: 'priceFeedSlice',
  reducers: {
    reset: () => initialState,
    initUserPriceAlert: (state, action: PayloadAction<IPriceAlert[]>) => {
        return [...action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export default priceAlertSlice.reducer;

export const { reset, initUserPriceAlert } = priceAlertSlice.actions;
