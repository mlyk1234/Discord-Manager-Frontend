import { Button, Checkbox, Container, Grid, PasswordInput, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../../../shared/redux/api/auth.api";
import { Frame } from "../../shared/Framer";
import { Bounded } from "../../shared/BoundedInput";
import { AxiosResponse } from "axios";
import { Fade, Slide } from "react-awesome-reveal";
import { ExternalAuth } from "../extensions";

interface FormDataType { 
    emailAddress: string, 
    password: string, 
    rememberMe?: boolean 
};

export const Login = () => {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formData: FormDataType = { emailAddress: '', password: '', rememberMe: false };
    const [loginUser, { isLoading: isLoadingLogin, isError, error, isSuccess }] = useLoginUserMutation();

    useEffect(() => {
        if(isSuccess) {
            navigate('/dashboard');
        };
    }, [isSuccess]);

    const form = useForm({
        validateInputOnChange: true,
        initialValues: formData,
        validate: {
            emailAddress: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value === null || value === '' ? 'Please enter password.' : null),
        }
    })

    const handleSubmit = async () => {
        loginUser({...form.values});
    }

    useEffect(() => {
        if(isError && error) {
            const err = error as AxiosResponse;
            setErrorText(err.data.message)
        }
    }, [error, isError]);

    useEffect(() => {
        if(isLoadingLogin) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isLoadingLogin]);

    return (
        // <Fade triggerOnce>
            <Frame str={{primary: 'Log in to your account', secondary: 'Welcome back! Please enter your details'}} isLoading={isLoading} >
                <Container className="w-full pt-8">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Bounded>
                            <TextInput {...form.getInputProps('emailAddress')} radius='xl' type='email' placeholder="Email"/>
                            <PasswordInput {...form.getInputProps('password')} radius='xl' placeholder="Password" className="dfa-password-input"/>
                            <div className="inlined-between">
                                <div className="inlined-component gap-2">
                                    <Checkbox {...form.getInputProps('rememberMe')}/><Text className="text-white">Remember Me</Text>
                                </div>
                                <Text className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#F49634] to-[#F4D37F]">Forgot Password</Text>
                            </div>
                            <Button type="submit" radius='xl' className="bg-gradient-to-r from-[#F49634] to-[#F4D37F]">Login</Button>
                        </Bounded>
                    </form>
                    <Text className="inlined-component-centered text-white gap-1 pt-8">
                        Don't have an account?
                        <Text onClick={() => navigate('/register')} className="cursor-pointer font-medium text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">Sign up</Text></Text>
                        {errorText && <Text className="global-input-error text-center mt-2">{errorText}</Text>}
                    <div className="pt-6">
                        <ExternalAuth setIsLoading={setIsLoading} setErrorText={setErrorText}/>
                    </div>
                </Container>
            </Frame>
        // </Fade>
    )
}