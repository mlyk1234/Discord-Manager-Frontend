import { Container, Modal } from "@mantine/core";
import { createContext, useContext, useEffect, useState, useTransition } from "react";

import { DeFiAPIRoute } from "./sourceMap";
import { getJWT, useVerifyJWT } from "../shared/services/axios";

const AppRoute = () => {
    const [session, setSession] = useState('inactive');
    const { verifyJWT, isSuccessJWT, isErrorJWT } = useVerifyJWT();
    // if(localStorage.getItem('access_token')) {
    //     session = "active";
    // }
    useEffect(() => {
        if(localStorage.getItem('access_token')) {
            verifyJWT();
        }
    }, []);

    useEffect(() => {
        if(isErrorJWT) {
            setSession('inactive');
        }
    }, [isErrorJWT])

    useEffect(() => {
        if(isSuccessJWT) {
            setSession('active');
        }
    }, [isSuccessJWT])

    return (
        <DeFiAPIRoute authenticated={session === 'active' ? true : false}/>

    )
}

export default AppRoute;