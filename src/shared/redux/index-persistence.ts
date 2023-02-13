import { notificationSetupApi } from './api/notification-setup';
import { userApi } from './api/user.api';
import { authApi } from './api/auth.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userReducer from './features/user.slice';
import { priceFeedApi } from './api/price-feed.api';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [priceFeedApi.reducerPath]: priceFeedApi.reducer,
    [notificationSetupApi.reducerPath]: notificationSetupApi.reducer,
    userState: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storer = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
    .concat([
        authApi.middleware,
        userApi.middleware,
        priceFeedApi.middleware,
        notificationSetupApi.middleware
    ]),
});

export type RootState = ReturnType<typeof storer.getState>;
export type AppDispatch = typeof storer.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// setupListeners(store.dispatch);
export default storer;