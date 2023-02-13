import { useOnPageLoad, useOnPageLoad2 } from './global/useOnPageLoad';
import { useOnPageRefresh, useRefreshToken } from './session-helper/refresh-token-helper';
import { useLogoutTimer } from './session-helper/inactivity-helper';
interface IHookActions {
    inject: Function[]
}

const useCreateHook = ({injector}:{injector: Function[]}) => {
    const map: any[] = [];
    injector.forEach((fn) => {
        map.push(fn());
    });
    console.log('Initialized Hooks', map)
}

export const useHooks = () => {

    useCreateHook({
        injector: [
            // useRefreshToken,
            useOnPageLoad,
            useOnPageRefresh,
            useLogoutTimer
        ]
    });

}