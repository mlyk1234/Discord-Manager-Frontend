import { createApi } from '@reduxjs/toolkit/query/react';
import { initUserNotificationSetup, INotificationSetup } from '../features/notification.slice';
import { axiosBaseQuery } from './axios-handler';

export const notificationSetupApi = createApi({
    reducerPath: 'notificationSetupApi',
    baseQuery: axiosBaseQuery({
        controller_url: `/api/v1/notification/`,
    }),
    endpoints(build) {
        return {
            getNotificationSetup: build.mutation<INotificationSetup, void>({
                query: () => ({
                    endpointurl: 'get-social-media-details',
                    method: 'get'
                }),
                transformResponse: (result: { data: INotificationSetup }) => {
                    // console.log('[transformResponse] - [getNotificationSetup]', result.data);
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(initUserNotificationSetup(data));
                    } catch (error) {
                        console.log('error [getNotificationSetup]')
                    }
                }
            }),
        };
    },
});

export const { useGetNotificationSetupMutation } = notificationSetupApi;