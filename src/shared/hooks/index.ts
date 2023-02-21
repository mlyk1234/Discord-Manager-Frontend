import { useEffect } from 'react';
import { useState } from 'react';
import { useInitNotification, useInitUserDetails, useInitUserPriceAlerts } from './global/on-logged-hooks';
import { useOnPageLoad } from './global/useOnPageLoad';
import { useOnPageRefresh, useRefreshToken } from './session-helper/refresh-token-helper';
import { useLogoutTimer } from './session-helper/inactivity-helper';
import { useAppSelector } from '../redux';
import { useTimeout } from './session-helper/timeout-helper';
interface IHookActions {
    inject: Function[]
}

const CreateHooks = ({injector}: {injector: Function[]}) => {
    const map: any[] = [];
    injector.forEach((fn) => {
        map.push(fn());
    });
    // console.log('Initialized Hooks', map)
}

export const useGeneralHooks = () => {
    CreateHooks({
        injector: [
            // useRefreshToken,
            useOnPageLoad,
            useOnPageRefresh,
            // useLogoutTimer
        ]
    });
}

export const useRequireAuthHooks = () => {

    // useInitNotification();
    useTimeout();
    useInitUserDetails();
    useInitUserPriceAlerts();
    useInitNotification();
}