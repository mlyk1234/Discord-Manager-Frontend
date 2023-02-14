import { useEffect } from 'react';
import { useAppDispatch } from '../../redux';
import { useGetAllNetworkQuery } from "../../redux/api/price-feed.api"
import { setNetworkChain } from '../../redux/features/price-feed.slice';

export const useOnPageLoad = () => {

    const { isLoading, isError, error, isSuccess, data } = useGetAllNetworkQuery();

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(data && data.length > 0) {
            dispatch(setNetworkChain(data));
        }
    }, [data, dispatch]);

    return {
        name: 'onPageLoad',
    }

}