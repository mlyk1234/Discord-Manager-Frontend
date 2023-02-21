import { Container, Grid, Text } from "@mantine/core"
import { signInWithPopup } from "firebase/auth";
import { SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socialIcon } from "../../../asset/common/social"
import { auth, authProviders, providersType } from "./providers";
import { useFirebase } from "./useFirebase";



export const ExternalAuth = ({setIsLoading, setErrorText}: {setIsLoading: Function, setErrorText: Function}) => {
    const { firebaseSignIn, isError, isLoading, isSuccess, error } = useFirebase();
    const navigate = useNavigate();
    useEffect(() => {
        if(error) {
            setErrorText(error);
        }
    }, [error])
    
    useEffect(() => {
        if(isLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isLoading]);
    
    return (
        <Container p={0} className='w-full px-10 flex flex-col items-center gap-6'>
            <Text className="text-dfa-grey">Or continue with</Text>
            <Grid m={0} className="w-full justify-between">
                {Object.keys(socialIcon).map((key: string, index) =>
                    <Grid key={index} onClick={() => firebaseSignIn(key as providersType)} m={0}>
                        {socialIcon[key as providersType]}
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

