import { Container, Text } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound404() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, [])
    return (
        <Container className="w-full h-full flex-col inlined-component-centered">
            <Text className="text-white">Not Found 404!</Text>
            <Text className="text-white text-sm text-dfa-grey">Redirecting you back to main page.</Text>
        </Container>
    )
}