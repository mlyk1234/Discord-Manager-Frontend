import { Button, Container, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DFAIcon } from "../../asset/DFA/bell.icon.svg";

export const Unauthorized = () => {
    const [initialTemplate, setInitialTemplate] = useState<JSX.Element>(<></>)

    let session = "inactive";

    useEffect(() => {
        if(session === 'inactive') {
            setInitialTemplate(<LogOutTemplate/>)
        }
    }, [session])

    return (
        <Container p={0} className='w-full h-full'>
            {initialTemplate}
        </Container>
    )
}

const LogOutTemplate = () => {
    const navigate = useNavigate();
    return (
        <Container className="w-full h-full inlined-component-centered flex-col gap-3">
            <Text className="text-xl text-white font-semibold text-center">Uh oh... You have been logged out.</Text>
            <Button onClick={() => navigate('/')} radius={'xl'} className="dfa-btn-gradient">Back to Login</Button>
        </Container>
    )
}