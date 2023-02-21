import { axiosBaseQuery } from './axios-handler';
import { createApi } from '@reduxjs/toolkit/query/react';

export const userSettingApi = createApi({
    reducerPath: 'userSetting',
    baseQuery: axiosBaseQuery({
        controller_url: `/api/v1/price-alert/`,
    }),
    tagTypes: ['UserSetting'],
    endpoints(build) {
        return {
            updateUserSetting: build.mutation({
                query: (data) => ({
                    endpointurl: 'update-alert-setting',
                    method: 'post',
                    data: data,
                }),
                transformResponse: (result: { data: any }) => {
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled}) {
                    try {
                        const { data } = await queryFulfilled;
                    } catch (error) {
                        console.log('Error [getAllNetwork]');
                    }
                }
            }),
            getUserSetting: build.mutation<any, void>({
                query: () => ({
                    endpointurl: 'setting',
                    method: 'get'
                }),
                transformResponse: (result: { data: any }) => {
                    return result.data.alert_text;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log('[getUserSetting]', data)
                    } catch (error) {
                        console.log('Error [getUserSetting]');
                    }
                }
            })
        }
    }
});

export const { useUpdateUserSettingMutation, useGetUserSettingMutation } = userSettingApi;