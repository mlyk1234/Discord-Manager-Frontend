import { Button,  Checkbox, Container, Grid, PasswordInput, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom"


import { PASSWORD_PATTERN } from "../../../shared/definition/regex";
import { Frame } from "../../shared/Framer";
import { Bounded } from "../../shared/BoundedInput";
import { useRegisterUserMutation } from "../../../shared/redux/api/user.api";
import { AxiosResponse } from "axios";
import { Fade } from "react-awesome-reveal";


export const Register = () => {
    const navigate = useNavigate();
    const [checkbox, setCheckbox] = useState<null | boolean>(null);
    const [registerUser, { isLoading, isError, error, isSuccess }] = useRegisterUserMutation();
    const [errorText, setErrorText] = useState(null);

    interface FormDataType { emailAddress: string, password: string, confirm_password: '', checked: string | boolean };
    const formData: FormDataType = { emailAddress: '', password: '', confirm_password: '', checked: '' };

    const form = useForm({
        validateInputOnChange: true,
        initialValues: formData,
        validate: {
            emailAddress: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (PASSWORD_PATTERN.test(value) ? null : 'Password must be a combination of at least 1 uppercase, 1 lower case, 1 number and 1 special character with min length of 8'),
            confirm_password: (value, primary_value) => (value !== primary_value.password ? 'Password not matched!' : null),
        }
    })
    const handleSubmit = async () => {
        if(!checkbox) { form.values.checked = false; return; }
        const payload = {
            ...form.values
        }
        const {checked, ...rest} = form.values;
        registerUser({...rest});
    };

    if(isSuccess) {
        navigate(`/verify?email=${form.values.emailAddress}`)
    }

    useEffect(() => {
        if(isError && error) {
            const err = error as AxiosResponse;
            setErrorText(err.data.message)
        }
    }, [error, isError]);

    return (
        <Fade>
            <Frame str={{primary: 'Create an account', secondary: 'Sign up in less than 2 minutes.'}} >
                <Container className="w-full pt-8">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Bounded>
                            <TextInput {...form.getInputProps('emailAddress')} radius='xl' type='email' placeholder="Email"/>
                            <PasswordInput {...form.getInputProps('password')} radius='xl' placeholder="Password" className="dfa-password-input"/>
                            <PasswordInput {...form.getInputProps('confirm_password')} radius='xl' placeholder="Confirm Password" className="dfa-password-input"/>
                            <div className="flex flex-col gap-2">
                                <div className="inlined-component gap-2">
                                    <Checkbox {...form.getInputProps('checked')} onClick={() => setCheckbox(!checkbox)}/>
                                    <Text className="text-white text-sm">I agree to the Terms of Service and Privacy Policy.</Text>
                                </div>
                                {form.values.checked === false && <Text className="global-input-error">Please accept the terms to proceed.</Text>}
                            </div>
                            <Button type="submit" radius='xl' className="bg-gradient-to-r from-[#F49634] to-[#F4D37F]">Register</Button>
                        </Bounded>
                    </form>
                    <Text className="inlined-component-centered text-white gap-1 pt-8">
                        Already have an account?
                        <Text onClick={() => navigate('/')} className="cursor-pointer font-medium text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">Log in now</Text></Text>
                        {errorText && <Text className="global-input-error text-center mt-2">{errorText}</Text>}
                    {/* <ExternalAuth/> */}
                </Container>
            </Frame>
        </Fade>
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