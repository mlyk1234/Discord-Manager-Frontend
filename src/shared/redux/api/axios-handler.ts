import { useAppSelector } from './../index';
import { authSlice } from './../features/auth.slice';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';

let access_token: string;
export const injectableJWT = (_access_token: string) => {
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
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      requireJwt?: boolean;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, requireJwt }) => {
    try {
        // if(requireJwt) {
        //     headers = {
        //         Authorization: `Bearer ${access_token}`
        //     }
        // }
      // axios.defaults.withCredentials = true; ;TODO cookie based JWT backend only
      const result = await axios({ url: baseUrl + url, method, data, params, headers: {
        Authorization: `Bearer ${access_token}`
      }});
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
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
