import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../..";
import { useAppDispatch, useAppSelector } from "../../redux";
import { injectableJWT } from "../../redux/api/axios-handler";
import { clearToken, setJWTAuth } from "../../redux/features/auth.slice";
import { updateSessionStatus } from "../../redux/features/session.slice";

export const getToken = async (access_token: string) => {
    return await axios.get(`${BASE_URL}/api/v1/auth/refresh-token`, {headers: {
        Authorization: `Bearer ${access_token}`
    }});
}

let time: any;
let initialTime = new Date();

export const useRefreshToken = () => {
    let dispatch = useAppDispatch();
    const access_token = localStorage.getItem('access_token');
    const milliseconds = useAppSelector((state) => state.authSlice.milliseconds);
    // console.log('[useRefreshToken]: You have left', milliseconds)
    // console.log('[Refresh]', access_token);

    async function refreshToken() {
        if (access_token !== null) {
            try {
                let response = await getToken(access_token);
                let token = response.data.data.access_token;
                await injectableJWT(token);
                localStorage.setItem("access_token", token);
            } catch (err) {
                dispatch(clearToken());
                localStorage.clear();
                dispatch(updateSessionStatus('inactive'))
            }
        }
    }

    function refresher() {
        clearInterval(time);
        
        let checkSessionTimeout = () => {
            const threshold = milliseconds;
            var minutes = Math.abs((initialTime.valueOf() - (new Date()).valueOf()) / 1000 / 60);
            if (minutes > 10) {
                initialTime = new Date();
                refreshToken();
            }
        };
        time = setInterval(checkSessionTimeout, 1000 * 2);
    }

    refresher()

    return {
        name: 'refreshToken'
    }
}

// if user no interact within half of timestamp, then begin check about logout
// if got then refresh token about

export const useOnPageRefresh = () => {
    // Refresh page should get new token => Active State
    let dispatch = useAppDispatch();
    const access_token = localStorage.getItem('access_token');
    async function onPageRefresh() {
        if (access_token) {
            try {
                let response = await getToken(access_token);
                if (response.status !== 401) {
                    const { access_token, expiresIn  } = response.data.data;
                    const milliseconds = expiresIn - new Date().getTime();
                    dispatch(setJWTAuth({
                        access_token,
                        expiresIn,
                        milliseconds: milliseconds
                    }))
                    initialTime = new Date();
                }
                dispatch(updateSessionStatus('active'));
            } catch (e) {
                console.log('[Error useOnPageRefresh]:', e);
                localStorage.clear();
                dispatch(clearToken());
                dispatch(updateSessionStatus('inactive'));
            }
        }
    }

    useEffect(() => {
        onPageRefresh();
    }, [])

    return {
        name: 'pageRefresh'
    }
}

