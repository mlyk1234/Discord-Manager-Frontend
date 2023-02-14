import { IUser } from './../types';
import { axiosBaseQuery } from './axios-handler';
import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser } from '../features/user.slice';
import { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3002';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    controller_url: `/api/v1/user`,
  }),
  tagTypes: ['User'],
  endpoints(build) {
    return {
      registerUser: build.mutation<any, any>({
        query: (data) => ({
          endpointurl: '/register',
          method: 'post',
          data: data,
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled}) {
          try {
            const { data } = await queryFulfilled;
            console.log('Success [registerUser]', data)
          } catch (error) {
            let err = error as AxiosError;
            console.log('Error [registerUser]', err);
          }
        },

      }),
      getDetails: build.mutation({
        query: () => {
          // eslint-disable-next-line no-lone-blocks
          {
            return {
              endpointurl: '/get-profile',
              method: 'get',
              requireJwt: true
            };
          }
        },
        transformResponse: (result: { data: IUser }) => {
          return result.data;
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUser(data));
            // eslint-disable-next-line no-empty
          } catch (error) {
            console.log('Error [getMe]', error)
          }
        },
      }),
    };
  },
});

export const { useRegisterUserMutation } = userApi