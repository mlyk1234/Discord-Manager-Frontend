import { useEffect, useState } from 'react';
import { updateSessionStatus } from '../../redux/features/session.slice';
import { useAppDispatch, useAppSelector } from '../../redux';

let timeout: any;

export function useLogoutTimer() {
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

    function resetTime() {
        clearTimeout(timeout);
        
        if(session === 'active' && milliseconds) {
            console.log('cleared!');
            timeout = setTimeout(() => {
                dispatch(updateSessionStatus('inactive'));
            }, milliseconds)
        }
    }

    return {
        name: 'logoutTimer'
    }
}