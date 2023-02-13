import { axiosBaseQuery } from './axios-handler';
import { createApi } from '@reduxjs/toolkit/query/react';
const BASE_URL = 'http://localhost:3002';

export const priceFeedApi = createApi({
    reducerPath: 'priceFeedApi',
    baseQuery: axiosBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/price-feed/`,
    }),
    tagTypes: ['PriceFeed'],
    endpoints(build) {
        return {
            getAllNetwork: build.query<any[], void>({
                query: () => ({
                    url: 'network-chain',
                    method: 'get'
                }),
                transformResponse: (result: { data: any[] }) => {
                    console.log('priceFeedTransform', result);
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled}) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log('priceFeedApi', data)
                    } catch (error) {
                        console.log('Error [priceFeedApi]');
                    }
                }
            })
        }
    }
});

export const { useGetAllNetworkQuery } = priceFeedApi;