import { useAppSelector } from './../index';
import { authSlice } from './../features/auth.slice';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../..';
let access_token: string = localStorage.getItem('token') || '';
export const injectableJWT = async (_access_token: string) => {
    access_token = _access_token;
}

interface IErrorAxios {
  error: {
    status: number | any,
    data: string | any[] | unknown,
  }
}

export const axiosBaseQuery =
  (
    { controller_url }: { controller_url: string } = { controller_url: '' }
  ): BaseQueryFn<
    {
      endpointurl: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      requireJwt?: boolean;
    },
    unknown,
    unknown
  > =>
  async ({ endpointurl, method, data, params, requireJwt }) => {
    try {
      const result = await axios({ url: BASE_URL + controller_url + endpointurl, method, data, params, headers: {
        Authorization: `Bearer ${access_token}`
      }});
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.log('apakes', err)
      const errorObj: IErrorAxios = {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
      return {
        ...errorObj
      };
    }
  };
