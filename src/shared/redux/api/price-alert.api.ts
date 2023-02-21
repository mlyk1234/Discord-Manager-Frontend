import { axiosBaseQuery } from './axios-handler';
import { createApi } from '@reduxjs/toolkit/query/react';
import { initUserPriceAlert } from '../features/price-alert.slice';

export const priceAlertApi = createApi({
    reducerPath: 'priceAlertApi',
    baseQuery: axiosBaseQuery({
        controller_url: `/api/v1/price-alert/`,
    }),
    tagTypes: ['PriceAlert'],
    endpoints(build) {
        return {
            createAlert: build.mutation({
                query: (data) => ({
                    endpointurl: 'create-alert',
                    method: 'post',
                    data: data,
                }),
                transformResponse: (result: { data: any[] }) => {
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled}) {
                    try {
                        const { data } = await queryFulfilled;
                    } catch (error) {
                        console.log('Error [createAlert]', error);
                    }
                }
            }),
            modifyAlert: build.mutation({
                query: (data) => ({
                    endpointurl: 'modify',
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
                        console.log('Error [modifyAlert]', error);
                    }
                }
            }),
            deleteAlert: build.mutation({
                query: (data) => ({
                    endpointurl: 'delete',
                    method: 'post',
                    data: data,
                }),
                transformResponse: (result: { data: any }) => {
                    console.log('price alert deletion', result);
                    return result;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled}) {
                    try {
                        const { data } = await queryFulfilled;
                    } catch (error) {
                        console.log('Error [createAlert]', error);
                    }
                }
            }),
            getAlert: build.query<any[], void>({
                query: () => ({
                    endpointurl: 'list',
                    method: 'get'
                }),
                transformResponse: (result: { data: any[] }) => {
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(initUserPriceAlert(data));
                        
                    } catch (error) {
                        console.log('Error [queryAlert]', error)
                    }
                }
            })
        }
    }
});

export const { useCreateAlertMutation, useModifyAlertMutation, useDeleteAlertMutation, useGetAlertQuery, useLazyGetAlertQuery } = priceAlertApi;