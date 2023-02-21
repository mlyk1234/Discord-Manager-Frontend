import { axiosBaseQuery, injectableJWT } from './axios-handler';
import { IUser } from './../types';
import { createApi } from '@reduxjs/toolkit/query/react';

import { userApi } from './user.api';
import { setJWTAuth } from '../features/auth.slice';
import { updateSessionStatus } from '../features/session.slice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    controller_url: `/api/v1/auth/`,
  }),
  endpoints(build) {
    return {
      loginUser: build.mutation<
        {
          data: {
            expiresIn: number;
            access_token: string;
            user: IUser;
          };
          statusCode: number;
        },
        {
          emailAddress: string;
          password: string;
          rememberMe?: boolean
        }
      >({
        query: (data) => ({
          endpointurl: 'user-login',
          method: 'post',
          data: data,
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            await injectableJWT(data.data.access_token); // Accessible
            localStorage.setItem('access_token', data.data.access_token);
            const milliseconds = data.data.expiresIn - new Date().getTime();
            console.log('get milis', data.data.expiresIn);
            dispatch(setJWTAuth({
                access_token: data.data.access_token,
                expiresIn: data.data.expiresIn,
                milliseconds
            }));
            
            dispatch(updateSessionStatus('active'));
            dispatch(userApi.endpoints.getDetails.initiate(null))
            
          } catch (error) {
            console.log('Error [onQueryStarted]', error);
          }
        },
      }),
      logoutUser: build.mutation<void, void>({
        query: () => ({
          endpointurl: 'logout',
          method: 'post',
        }),
      }),
      changePassword: build.mutation({
        query: (data) => ({
          endpointurl: 'change-password',
          method: 'post',
          data: data,
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
          } catch (error) {
            console.log('Error [changePassword]')
          }
        }
      }),
      exchangeSocialToken: build.mutation
      <string | any, 
      {
        token: string
      }>({
        query: (data) => ({
          endpointurl: 'social-login/oauth',
          method: 'post',
          data: data,
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log('Success [exchangeSocialToken]', data);
            await injectableJWT(data.data.access_token); // Accessible
            localStorage.setItem('access_token', data.data.access_token);
            const milliseconds = data.data.expiresIn - new Date().getTime();
            dispatch(setJWTAuth({
                access_token: data.data.access_token,
                expiresIn: data.data.expiresIn,
                milliseconds
            }));
            
            dispatch(updateSessionStatus('active'));
            dispatch(userApi.endpoints.getDetails.initiate(null));
          } catch (error) {
            console.log('Error [exchangeSocialToken]', error)
          }
        }
      }),
    };
  },
  // endpoints: (builder) => ({
  //   loginUser: builder.mutation<
  //     {
  //       access_token: string;
  //       status: string;
  //     },
  //     {
  //       emailAddress: string;
  //       password: string;
  //     }
  //   >({
  //     query(data) {
  //       console.log('data', data);
  //       return {
  //         url: 'user-login',
  //         method: 'POST',
  //         body: data,
  //         credentials: 'include',
  //       };
  //     },
  //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
  //       try {
  //         console.log('yoyo');
  //         await queryFulfilled;
  //         await dispatch(userApi.endpoints.getMe.initiate(null));
  //         // eslint-disable-next-line no-empty
  //       } catch (error) {
  //         console.log('huh', error);
  //       }
  //     },
  //   }),
  //   logoutUser: builder.mutation<void, void>({
  //     query() {
  //       return {
  //         url: 'logout',
  //         credentials: 'include',
  //       };
  //     },
  //   }),
  // }),
});

export const { useLoginUserMutation, useChangePasswordMutation, useLogoutUserMutation, useExchangeSocialTokenMutation } = authApi;