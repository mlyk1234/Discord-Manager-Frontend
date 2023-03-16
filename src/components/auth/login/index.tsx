import { Button, Checkbox, Container, Grid, PasswordInput, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom"
import { Frame } from "../../shared/Framer/Framer";
import { Bounded } from "../../shared/BoundedInput";
import axios from "axios";
import { ReactComponent as MainIcon } from "../../../asset/common/page.icon.svg";
import "./login.scss";
import backendUrl from "../../../shared/constant";

interface FormDataType { 
    emailAddress: string, 
    password: string, 
    rememberMe?: boolean 
};

export const Login = () => {
    
    const { logMeIn, isSuccess, isError } = useLoginMutation();
    const [errorText, setErrorText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formData: FormDataType = { emailAddress: '', password: '', rememberMe: false };

    const form = useForm({
        validateInputOnChange: true,
        initialValues: formData,
        validate: {
            emailAddress: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value === null || value === '' ? 'Please enter password.' : null),
        }
    })

    const handleSubmit = async () => {
        try {
            const payload = {
                email: form.values.emailAddress,
                password: form.values.password
            }
            await logMeIn(payload);
        } catch (error) {
            // Skip
        }
    }

    return (
        // <Fade triggerOnce>
            <Frame str={{primary: 'Log in to your account', secondary: 'Welcome back! Please enter your details'}} isLoading={isLoading} >
                <div className="grids">
                    <div className={`col icon_placeholder ${isSuccess ? 'success' : null}`}><MainIcon/></div>
                    <div className={`col auth_placeholder ${isSuccess ? 'success' : null}`}>
                        <Container className="w-full pt-8">
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Bounded>
                                    <TextInput {...form.getInputProps('emailAddress')} radius='xl' type='email' placeholder="Email"/>
                                    <PasswordInput {...form.getInputProps('password')} radius='xl' placeholder="Password" className="dfa-password-input"/>
                                    <Button type="submit" radius='xl' className="dfa-btn-gradient">Login</Button>
                                </Bounded>
                            </form>
                        </Container>
                        {isError && 
                            <div className="text-red-500 text-center mt-5">Invalid Credentials</div> 
                        }
                    </div>
                </div>
            </Frame>
        // </Fade>
    )
}

const useLoginMutation = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const logMeIn = async (payload: {email: string, password: string}) => {
        try {
            const result = await axios.post(`${backendUrl}/auth/login`, {
                email: payload.email,
                password: payload.password
            });
            const { data } = result.data;
            localStorage.setItem('access_token', data.access_token);
            window.dispatchEvent(new Event("storage"));
            setIsSuccess(true);

        } catch (error) {
            setIsError(true);
            throw error
        }
    }

    return {
        logMeIn,
        isSuccess,
        isError
    }
}