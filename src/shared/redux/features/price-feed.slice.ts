import { IUser } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISupportedPair {
    pair: string,
    address: string,
    decimals: number
}

export interface INetworkChain {
    id: number,
    network: string,
    status: string,
    supported_pair: ISupportedPair[]
}

const initialState: INetworkChain[] = [];

export const priceFeedSlice = createSlice({
  initialState,
  name: 'priceFeedSlice',
  reducers: {
    reset: () => initialState,
    setNetworkChain: (state, action: PayloadAction<INetworkChain[]>) => {
        return [...action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export default priceFeedSlice.reducer;

export const { reset, setNetworkChain } = priceFeedSlice.actions;
