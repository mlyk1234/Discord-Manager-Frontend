import { createApi } from '@reduxjs/toolkit/query/react';
import { initUserNotificationSetup, INotificationSetup } from '../features/notification.slice';
import { axiosBaseQuery } from './axios-handler';

const BASE_URL = 'http://localhost:3002';

export const notificationSetupApi = createApi({
    reducerPath: 'notificationSetupApi',
    baseQuery: axiosBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/notification/`,
    }),
    endpoints(build) {
        return {
            getNotificationSetup: build.query<INotificationSetup, void>({
                query: () => ({
                    url: 'get-social-media-details',
                    method: 'get'
                }),
                transformResponse: (result: { data: INotificationSetup }) => {
                    console.log('[transformResponse] - [getNotificationSetup]', result.data);
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(initUserNotificationSetup(data));
                        console.log('[getNotificationSetup]', data);
                        // dispatch
                    } catch (error) {
                        console.log('error [getNotificationSetup]')
                    }
                }
            }),
        };
    },
});

export const { useGetNotificationSetupQuery, useLazyGetNotificationSetupQuery } = notificationSetupApi;