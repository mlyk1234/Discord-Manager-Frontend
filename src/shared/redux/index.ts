import { userSettingApi } from './api/user-setting.api';
import { notificationSetupApi } from './api/notification-setup.api.';
import { userApi } from './api/user.api';
import { authApi } from './api/auth.api';
import { priceFeedApi } from './api/price-feed.api';
import { priceAlertApi } from './api/price-alert.api';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userReducer from './features/user.slice';
import authReducer from './features/auth.slice';
import sessionReducer from './features/session.slice';
import priceFeedReducer from './features/price-feed.slice';
import priceAlertReducer from './features/price-alert.slice';
import notificationReducer from './features/notification.slice';
// import { persistConfig, _IGNORED_ACTIONS } from './redux-storage';


export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [priceFeedApi.reducerPath]: priceFeedApi.reducer,
    [priceAlertApi.reducerPath]: priceAlertApi.reducer,
    [userSettingApi.reducerPath]: userSettingApi.reducer,
    [notificationSetupApi.reducerPath]: notificationSetupApi.reducer,
    userSlice: userReducer,
    authSlice: authReducer,
    sessionSlice: sessionReducer,
    priceFeedSlice: priceFeedReducer,
    priceAlertSlice: priceAlertReducer,
    notificationSlice: notificationReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer, //! [Redux-Persist] https://www.npmjs.com/package/redux-persist
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
    .concat([
        authApi.middleware,
        userApi.middleware,
        priceFeedApi.middleware,
        priceAlertApi.middleware,
        userSettingApi.middleware,
        notificationSetupApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;