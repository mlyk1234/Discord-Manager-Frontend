import { Container, Modal } from "@mantine/core";
import { createContext, useContext, useEffect, useState, useTransition } from "react";

import { DeFiAPIRoute } from "./sourceMap";
import { getJWT, useVerifyJWT } from "../shared/services/axios";
import { useNavigate } from "react-router-dom";

const AppRoute = () => {
    const [session, setSession] = useState('inactive');
    const { verifyJWT, isSuccessJWT, isErrorJWT } = useVerifyJWT();
    // if(localStorage.getItem('access_token')) {
    //     session = "active";
    // }
    const navigate = useNavigate();
    const [localStore, setLocalStore] = useState<string | null>(localStorage.getItem('access_token'));
    const addChanges = async () => {
        console.log('[change detected]');
        setLocalStore(localStorage.getItem('access_token'));
    }
    const rmChanges = async () => {
        console.log('[change detected]');

    }
    window.addEventListener('storage', addChanges);
    useEffect(() => {
        
        if(localStore) {
            verifyJWT();
        } else {
            setSession('inactive');
            navigate('/')
        }
        console.log('localstore', localStore)
        return () => {
            window.removeEventListener('storage', rmChanges)
        }
    }, [localStore]);

    useEffect(() => {
        if(isErrorJWT) {
            setSession('inactive');
        }
    }, [isErrorJWT])

    useEffect(() => {
        if(isSuccessJWT) {
            setSession('active');
            
            setTimeout(() => {
                navigate('/dashboard');;
            }, 1000)
        }
    }, [isSuccessJWT])

    return (
        <DeFiAPIRoute authenticated={session === 'active' ? true : false}/>
    )
}

export default AppRoute;