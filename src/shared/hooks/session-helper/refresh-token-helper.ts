import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setJWTAuth } from "../../redux/features/auth.slice";
import { updateSessionStatus } from "../../redux/features/session.slice";

export const getToken = async (access_token: string) => {
    return await axios.get('http://localhost:3002/api/v1/auth/refresh-token', {headers: {
        Authorization: `Bearer ${access_token}`
    }});
}

let time: any;
let initialTime = new Date();

export const useRefreshToken = () => {
    let dispatch = useAppDispatch();
    const access_token = useAppSelector((state) => state.authSlice.access_token);
    console.log('injected!', access_token);

    async function refreshToken() {
        if (access_token !== null) {
            try {
                let response = await getToken(access_token);
                let token = response.data.data.access_token;
                localStorage.setItem("access_token", token);
            } catch (err) {
                dispatch(updateSessionStatus('inactive'))
            }
            //console.log("access token stored", token);
        }
    }

    function refresher() {
        clearInterval(time);
        
        let checkSessionTimeout = () => {
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

export const useOnPageRefresh = () => {
    // Refresh page should get new token => Active State
    let dispatch = useAppDispatch();
    const access_token = useAppSelector((state) => state.authSlice.access_token);
    async function onPageRefresh() {
        if (access_token !== null) {
            try {
                let response = await getToken(access_token);
                if (response.status !== 401) {
                    const { access_token, expiresIn  } = response.data.data;
                    dispatch(setJWTAuth({
                        access_token,
                        expiresIn
                    }))
                    initialTime = new Date();
                }
            } catch (e) {
                console.log('[Error useOnPageRefresh]:', e);
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