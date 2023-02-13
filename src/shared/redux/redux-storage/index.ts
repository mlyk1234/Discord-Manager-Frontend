import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, PersistConfig, PersistedState, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
//! [Modified Interface] Source: https://github.com/rt2zz/redux-persist/blob/master/types/types.d.ts
interface _IPERSIST_CONFIG {
    version?: number;
    storage: Storage | any;
    key: string;
    keyPrefix?: string;
    blacklist?: Array<string>;
    whitelist?: Array<string>;
    transforms?: Array<any>;
    throttle?: number;
    migrate?: any;
    stateReconciler?: false | any;
    getStoredState?: (config: PersistConfig<any>) => Promise<PersistedState>;
    debug?: boolean;
    serialize?: boolean;
    timeout?: number;
    writeFailHandler?: (err: Error) => void;
}

export const persistConfig: _IPERSIST_CONFIG = {
    key: 'root',
    storage: storage,
    blacklist: ['priceAlertSlice', 'priceAlertApi']
};

export const persistedReducer = (combinedReducers: any) => persistReducer(persistConfig, combinedReducers);

export const _IGNORED_ACTIONS = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];