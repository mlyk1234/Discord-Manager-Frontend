import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type _SESSION_STATE = 'active' | 'inactive';

export interface ISESSION_STATUS {
    session_status: _SESSION_STATE;
}

const initialState: ISESSION_STATUS = {
    session_status: 'inactive'
}

const sessionSlice = createSlice({
    name: 'sessionSlice',
    initialState,
    reducers: {
        updateSessionStatus(state, action: PayloadAction<_SESSION_STATE, string>) {
            state.session_status = action.payload;
        }
    }
})

export const { updateSessionStatus } = sessionSlice.actions

export default sessionSlice.reducer