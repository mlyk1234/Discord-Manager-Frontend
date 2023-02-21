import { useState, useEffect } from 'react';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';
import { auth, authProviders, providersType } from './providers';
import { useExchangeSocialTokenMutation } from '../../../shared/redux/api/auth.api';
import { useAppDispatch } from '../../../shared/redux';
export const useFirebase = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<any>();
    const [exchangeSocialToken, {error: errorData, isError: exchangeTokenError, isSuccess: exchangeTokenSuccess }] = useExchangeSocialTokenMutation();

    const firebaseSignIn = async (platform: providersType) => {
        setIsLoading(true);

        const authObject = getProvider(platform);

        try {
            await signInWithPopup(auth, authObject.instance);

            const currentUser = auth.currentUser;
            if(!currentUser) throw new Error('[Something wrong]: Invalid User');
            const idToken = await currentUser.getIdToken(false);
            exchangeSocialToken({token: idToken});

            setIsSuccess(true);
            setIsLoading(false);
        } catch (error) {
            const err = error as FirebaseError | any;
            console.log('[Error firebaseSignin]:', err);
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(errorData) {
            const err = errorData as FirebaseError | any;
            setError(err.data.message)
        }
    }, [errorData])
    useEffect(() => {
        if(exchangeTokenSuccess) {
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    }, [exchangeTokenSuccess])

    useEffect(() => {
        if(exchangeTokenError) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [exchangeTokenError])

    return {
        isSuccess,
        isLoading,
        isError,
        error,
        firebaseSignIn
    }
}

const getProvider = (platform: providersType) => {
    if(!platform) throw new Error('Unsupported Provider!');
    return authProviders[platform];
}