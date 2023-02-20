import { Button, Container, Input, PasswordInput, Text } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../shared/redux";
import { useChangePasswordMutation } from "../../../shared/redux/api/auth.api";
import "./index.scss";

export const AccountSettings = () => {
    const [initialEmail, setInitialEmail] = useState('');
    const loggedEmail = useAppSelector((state) => state.userSlice.user.emailAddress);
    useEffect(() => {
        if(loggedEmail) {
            setInitialEmail(loggedEmail);
        }
    }, [loggedEmail])
    return (
        <Container p={0} className='w-full'>
            <Container p={0} pb={32} mb={32} className='w-full flex flex-row justify-between items-center border-b border-dfa-grey'>
                <Text className="text-white text-sm font-medium">Email Address</Text>
                <Input disabled className="account-setting-responsive-input" value={loggedEmail} radius={'xl'}/>
            </Container>
            <PasswordSettingGroup/>
        </Container>
    )
}

interface IPasswordFormEntry {
    name: string,
    affix: string,
    desc: string,
    disable: boolean
}

const passwordFormEnties: IPasswordFormEntry[] = [
    {
        name: 'Current Password',
        affix: 'currentPassword',
        desc: 'Enter your current password',
        disable: false
    },
    {
        name: 'New Password',
        affix: 'newPassword',
        desc: 'Enter your new password',
        disable: false
    },
    {
        name: 'Confirm New Password',
        affix: 'confirmNewPassword',
        desc: 'Enter your new password',
        disable: false
    }
]

interface formData {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

const initialValue: formData = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}
const PasswordSettingGroup = () => {
    const [inputs, setInputs] = useState<IPasswordFormEntry[]>(passwordFormEnties);
    const [errText, setErrText] = useState('');
    const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();
    
    const form = useForm({
        validateInputOnChange: true,
        initialValues: initialValue,
        validate: {
            currentPassword: (value) => (!value ? 'Please enter password.' : null),
            newPassword: isNotEmpty(),
            confirmNewPassword: (value, matcher) => (value !== matcher.newPassword ? 'Password did not match': null)
        }
    })
    const submitHandler = () => {
        changePassword({...form.values})
    };
    useEffect(() => {
        if(isSuccess) {
            form.reset();
        }
    }, [isSuccess]);

    useEffect(() => {
        if(isError) {
            const err = error as AxiosResponse;
            setErrText(err.data.message);
        }
    }, [isError]);
    return (
        <Container p={0}>
            <form onSubmit={form.onSubmit(submitHandler)}>
                <div className="flex flex-col gap-[22px]">
                {
                    inputs.map((item, index) => 
                        <Container key={index} p={0} className='w-full flex flex-row justify-between whitespace-nowrap'>
                            <Text className="text-white text-sm font-medium mt-[8px]">{item.name}</Text>
                            <PasswordInput {...form.getInputProps(item.affix)} className="ml-2 account-setting-responsive-input dfa-password-input" placeholder={item.desc} radius={'xl'}/>
                        </Container>
                    )
                }
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-8">
                    {isError &&
                        <div className="text-red-500 text-xs text-center mb-4">{errText}</div>
                    }
                    {isSuccess &&
                        <div className="text-green-500 text-xs text-center mb-4">Password have been changed.</div>
                    }
                    <Button type="submit" radius={'xl'} className="dfa-btn-gradient account-setting-responsive-btn">Confirm</Button>
                    <Text onClick={() => form.reset()} className="cursor-pointer text-white text-sm font-medium mt-4">Reset</Text>
                </div>
            </form>
        </Container>
    )
}