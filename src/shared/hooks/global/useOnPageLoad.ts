import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux';
import { useLazyGetNotificationSetupQuery } from '../../redux/api/notification-setup.api.';
import { useGetAlertQuery } from '../../redux/api/price-alert.api';
import { useGetAllNetworkQuery } from "../../redux/api/price-feed.api"
import { initUserPriceAlert } from '../../redux/features/price-alert.slice';
import { setNetworkChain } from '../../redux/features/price-feed.slice';

export const useOnPageLoad = () => {

    const { isLoading, isError, error, isSuccess, data } = useGetAllNetworkQuery();

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(data && data.length > 0) {
            console.log('gg', data)
            dispatch(setNetworkChain(data));
        }
    }, [data, dispatch]);

    return {
        name: 'onPageLoad',
    }
}

export const useOnPageLoad2 = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isError, error, isSuccess, data } = useGetAlertQuery();
    const user = useAppSelector((state) => state.userSlice.user?.emailAddress); // buggy
    useEffect(() => {
        if(user !== '') {
            console.log('ready', data);
            if(data && data.length > 0) {
                dispatch(initUserPriceAlert(data))
            }
        }
    }, [data, user])


    return {
        name: 'onPageLoadSess'
    }
}