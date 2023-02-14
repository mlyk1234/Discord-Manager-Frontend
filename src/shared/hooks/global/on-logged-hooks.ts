import { useAppDispatch } from './../../redux/index';
import { useEffect } from "react";
import { useAppSelector } from "../../redux";
import { useGetNotificationSetupMutation } from "../../redux/api/notification-setup.api.";
import { useLazyGetAlertQuery } from "../../redux/api/price-alert.api";
import { userApi } from '../../redux/api/user.api';

export const useInitNotification = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    const [trigger, {data}] = useGetNotificationSetupMutation();
    useEffect(() => {
        async function fn() {
            if(session === 'active') {
                await trigger();
            }
        }
        fn();
    }, [session, trigger])

    return;
}

export const useInitUserPriceAlerts = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    const [trigger, { data }] = useLazyGetAlertQuery();
    useEffect(() => {
        async function fn() {
            if(session === 'active') {
                await trigger();
            }
        }
        fn();
    }, [session, trigger])

    return;
}

export const useInitUserDetails = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(session === 'active') {
            dispatch(userApi.endpoints.getDetails.initiate(null))
        }
    }, [session])

    return;
}
