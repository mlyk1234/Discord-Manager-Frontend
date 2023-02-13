import { axiosBaseQuery } from './axios-handler';
import { createApi } from '@reduxjs/toolkit/query/react';
const BASE_URL = 'http://localhost:3002';

export const priceAlertApi = createApi({
    reducerPath: 'priceAlertApi',
    baseQuery: axiosBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/price-alert/`,
    }),
    tagTypes: ['PriceAlert'],
    endpoints(build) {
        return {
            createAlert: build.mutation({
                query: (data) => ({
                    url: 'create-alert',
                    method: 'post',
                    data: data,
                }),
                transformResponse: (result: { data: any[] }) => {
                    console.log('price alert creation', result);
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled}) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log('price alert created', data)
                    } catch (error) {
                        console.log('Error [createAlert]', error);
                    }
                }
            }),
            getAlert: build.query<any[], void>({
                query: () => ({
                    url: 'list',
                    method: 'get'
                }),
                transformResponse: (result: { data: any[] }) => {
                    console.log('priceAlertTransform', result);
                    return result.data;
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log('Fulfilled [queryAlert]')
                    } catch (error) {
                        console.log('Error [queryAlert]', error)
                    }
                }
            })
        }
    }
});

export const { useCreateAlertMutation, useGetAlertQuery, useLazyGetAlertQuery } = priceAlertApi;