import { useEffect } from 'react';
import { useState } from 'react';
import { useInitNotification, useInitUserPriceAlerts } from './global/on-logged-hooks';
import { useOnPageLoad, useOnPageLoad2 } from './global/useOnPageLoad';
import { useOnPageRefresh, useRefreshToken } from './session-helper/refresh-token-helper';
import { useLogoutTimer } from './session-helper/inactivity-helper';
import { useAppSelector } from '../redux';
interface IHookActions {
    inject: Function[]
}

const CreateHooks = ({injector}: {injector: Function[]}) => {
    const map: any[] = [];
    injector.forEach((fn) => {
        map.push(fn());
    });
    console.log('Initialized Hooks', map)
}

export const useGeneralHooks = () => {
    CreateHooks({
        injector: [
            // useRefreshToken,
            useOnPageLoad,
            useOnPageRefresh,
            useLogoutTimer
        ]
    });
}

export const useAuthenticatedHooks = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);

    useEffect(() => {
        if(session && session === 'active') {
            CreateHooks({
                injector: [
                    useInitNotification
                ]
            })
        }
    }, [session]);
}

export const useRequireAuthHooks = () => {

    // useInitNotification();
    useInitUserPriceAlerts();
    useInitNotification();
}