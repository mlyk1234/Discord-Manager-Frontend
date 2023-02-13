import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios-handler';

const BASE_URL = 'http://localhost:3002';

export const notificationSetupApi = createApi({
    reducerPath: 'notificationSetupApi',
    baseQuery: axiosBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/auth/`,
    }),
    endpoints(build) {
        return {
            notificationSetup: build.query<any, null>({
                query: () => {
                    {
                        return {
                            url: '/notification/get-social-media-details',
                            method: 'get'
                        };
                    }
                },
                transformResponse: (result: { data: any }) => {
                    console.log('transform notification', result.data);
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log('query started', data);
                        // dispatch
                    } catch (error) {
                        console.log('error notificationsetup querystarted')
                    }
                }
            }),
        };
    },
});

export const { useNotificationSetupQuery } = notificationSetupApi;