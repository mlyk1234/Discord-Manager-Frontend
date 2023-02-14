import { Button, Center, Container, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { ReactComponent as DFAIcon } from "../../asset/DFA/bell.icon.svg";
export const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <Container p={0} className='w-full h-full'>
            <Container className="w-full h-full inlined-component-centered flex-col gap-3">
                <DFAIcon/>
                <Text className="text-xl text-white font-semibold">Uh oh... Please login first</Text>
                <Button onClick={() => navigate('/')} radius={'xl'} className="dfa-btn-gradient">Back to Login</Button>
            </Container>
        </Container>
    )
}