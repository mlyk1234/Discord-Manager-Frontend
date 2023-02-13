import { Button, Text } from "@mantine/core"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Bounded } from "../../../shared/BoundedInput";
import { Frame } from "../../../shared/Framer"

const initialText = (email: string | null) => <Text>You've entered <span className="font-bold">{email}</span> as the email for your account.</Text>;

export const Verification = () => {
    const [text, setText] = useState<JSX.Element>(<Text>Nothing to see.</Text>);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(searchParams.get('email') !== null) {
            setText(initialText(searchParams.get('email')));
        }
    }, [])

    return (
        <>
        <Frame str={{primary: 'Verify your email', secondary: text}} sizingOptions='Small' >
            <Button onClick={() => navigate('/')} type="submit" radius='xl' className="bg-gradient-to-r from-[#F49634] to-[#F4D37F] w-full mt-8">Back to Login</Button>
        </Frame>
        </>
    )
}