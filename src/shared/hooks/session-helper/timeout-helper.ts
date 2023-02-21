import { useCallback, useEffect } from 'react';
import { getToken } from './refresh-token-helper';
import { useAppDispatch, useAppSelector } from "../../redux"
import { updateSessionStatus } from "../../redux/features/session.slice";
import { clearToken, setJWTAuth } from '../../redux/features/auth.slice';
import { logout } from '../../redux/features/user.slice';

let idle: any;
let toLogoutTime: any;
let timeLeftSinceLoggedIn: any;

// Improved Mechanics
export const useTimeout = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    const { milliseconds, expiresIn, access_token } = useAppSelector((state) => state.authSlice);
    console.log('[Time left since logged in]', timeLeftSinceLoggedIn)
    window.onload = resetTime;
    window.onclick = resetTime;
    window.onkeypress = resetTime;
    window.ontouchstart = resetTime;
    window.onmousemove = resetTime;
    window.onmousedown = resetTime;

    // Prevent memory leaks
    // useEffect(() => {
    //     if(session === 'active') {
    //         window.addEventListener('scroll', resetTime, true);
    //     }
    //     // we need to detach the listener otherwise it will be reattach to different listener
    //     // addEventListen => assign to the position of scroll is Unique value, thus different listener still intach
    //     return () => { window.removeEventListener('scroll', resetTime, true); }
    // }, [session]);
    // Prevent memory leaks

    const dispatch = useAppDispatch();
    
    function resetTime() {
        clearTimeout(idle);
        clearTimeout(toLogoutTime);
        if(session === 'active') {
            console.log('aih')
            timeLeftSinceLoggedIn = expiresIn - new Date().getTime();
            if(milliseconds/2 > timeLeftSinceLoggedIn) {
                getToken(access_token).then((res) => {
                    const new_milliseconds = res.data.data.expiresIn - new Date().getTime();
                    dispatch(setJWTAuth({
                        access_token: res.data.data.access_token,
                        expiresIn: res.data.data.expiresIn,
                        milliseconds: new_milliseconds
                    }))
                    localStorage.setItem('access_token', res.data.data.access_token);
                    dispatch(updateSessionStatus('active'));
                }).catch((err) => {
                    dispatch(logout());
                    dispatch(clearToken());
                    dispatch(updateSessionStatus('inactive'));
                })
            }
            // start check
            shouldStart();
        } else {
            dispatch(logout());
            dispatch(clearToken());
            dispatch(updateSessionStatus('inactive'));
            timeLeftSinceLoggedIn = 0;
        }
    }

    function shouldStart() {
        idle = setTimeout(() => {
            console.log('[User idled, logging out in 1 minute(s)]', milliseconds/12);
            toLogOut();
        }, 450000)
    }

    function toLogOut() {
        toLogoutTime = setTimeout(() => {
            console.log('Logging out.');
            dispatch(logout());
            dispatch(clearToken());
            dispatch(updateSessionStatus('inactive'));
            timeLeftSinceLoggedIn = 0;
        // }, milliseconds/4)
        }, milliseconds)
    }

    resetTime();

    return {
        name: 'Timeout Helper'
    }
}