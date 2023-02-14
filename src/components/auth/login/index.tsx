import { Button, Center, Checkbox, Container, Grid, Image, Input, NavLink, PasswordInput, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm, UseFormReturnType } from '@mantine/form';
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../shared/redux";
import { useLoginUserMutation } from "../../../shared/redux/api/auth.api";
import { updateSessionStatus } from "../../../shared/redux/features/session.slice";

import { PASSWORD_PATTERN } from "../../../shared/definition/regex";
import { Frame } from "../../shared/Framer";
import { Bounded } from "../../shared/BoundedInput";
import { AxiosResponse } from "axios";

export const Login = () => {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState(null);

    interface FormDataType { emailAddress: string, password: string, rememberMe?: boolean };
    const formData: FormDataType = { emailAddress: '', password: '', rememberMe: false};
    const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

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
            password: (value) => (value === null ? 'Please enter password.' : null),
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

    return (
        <Frame str={{primary: 'Log in to your account', secondary: 'Welcome back! Please enter your details'}} >
            <Container className="w-full pt-8">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Bounded>
                        <TextInput {...form.getInputProps('emailAddress')} radius='xl' type='email' placeholder="Email"/>
                        <PasswordInput {...form.getInputProps('password')} radius='xl' placeholder="Password"/>
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
                {/* <ExternalAuth/> */}
            </Container>
        </Frame>
    )
}


export const ExternalAuth = () => {

    return (
        <Container>
            <div>Or continue with</div>
            <div>
                <Grid>Logo 1</Grid>
            </div>
        </Container>
    )
}