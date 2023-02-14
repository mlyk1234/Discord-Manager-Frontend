import { useEffect, useState } from 'react';
import { updateSessionStatus } from '../../redux/features/session.slice';
import { useAppDispatch, useAppSelector } from '../../redux';
import { logout } from '../../redux/features/user.slice';
import { clearToken } from '../../redux/features/auth.slice';

let timeout: any;

export function useLogoutTimer() {
    const [gotTouch, setGotTouch] = useState<boolean>(false);
    window.onload = resetTime;
    window.onclick = resetTime;
    window.onkeypress = resetTime;
    window.ontouchstart = resetTime;
    window.onmousemove = resetTime;
    window.onmousedown = resetTime;
    window.addEventListener('scroll', resetTime, true);

    const dispatch = useAppDispatch();
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    const milliseconds = useAppSelector((state) => state.authSlice.milliseconds);
    console.log('you have left', milliseconds)

    // setInterval(() => {

    // }, milliseconds/2)

    function resetTime() {
        clearTimeout(timeout);
        
        if(session === 'active' && milliseconds) {
            console.log('cleared!');
            timeout = setTimeout(() => {
                dispatch(logout());
                dispatch(updateSessionStatus('inactive'));
                dispatch(clearToken());
            }, milliseconds)
            
        }
    }

    return {
        name: 'logoutTimer'
    }
}