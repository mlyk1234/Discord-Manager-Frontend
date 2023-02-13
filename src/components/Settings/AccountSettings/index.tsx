import { Button, Container, Input, PasswordInput, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { useAppSelector } from "../../../shared/redux";

export const AccountSettings = () => {
    const loggedEmail = useAppSelector((state) => state.userSlice.user?.emailAddress);

    return (
        <Container p={0} className='w-full'>
            <Container p={0} pb={32} mb={32} className='w-full flex flex-row justify-between items-center border-b border-dfa-grey'>
                <Text className="text-white text-sm font-medium">Email Address</Text>
                <Input disabled className="w-[336px]" value={loggedEmail} radius={'xl'}/>
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

    const label = ['Current Password', 'New Password', 'Confirm New Password'];
    const form = useForm({
        initialValues: initialValue,
        // validate: {
        //     currentPassword: (value) =>
        // }
    })

    const submitHandler = () => {
        console.log('gg', form.values);
    }
    return (
        <Container p={0}>
            <form onSubmit={form.onSubmit(submitHandler)}>
                <div className="flex flex-col gap-[22px]">
                {
                    inputs.map((item, index) => 
                        <Container key={item.name} p={0} className='w-full flex flex-row justify-between items-center'>
                            <Text className="text-white text-sm font-medium">{item.name}</Text>
                            <PasswordInput className="w-[336px]" placeholder={item.desc} radius={'xl'}/>
                        </Container>
                    )
                }
                </div>
                <Button type="submit" radius={'xl'} className="dfa-btn-gradient w-[370px] mt-8">Confirm</Button>
                <Text className="cursor-pointer text-white text-sm font-medium mt-4">Reset</Text>
            </form>
        </Container>
    )
}