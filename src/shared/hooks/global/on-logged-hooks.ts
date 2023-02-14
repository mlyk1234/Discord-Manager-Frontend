import { useEffect } from "react";
import { useAppSelector } from "../../redux";
import { useLazyGetNotificationSetupQuery } from "../../redux/api/notification-setup.api.";
import { useLazyGetAlertQuery } from "../../redux/api/price-alert.api";

export const useInitNotification = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    const [trigger, {data}] = useLazyGetNotificationSetupQuery();
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