import { Button, Center, Container, Modal, Text } from "@mantine/core"
import { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DFAIcon } from "../../asset/DFA/bell.icon.svg";
type layout = 'variant_1' | 'variant_2';
export const DFAModal = ({opened, setOpened, str, children, variant = 'variant_1'}: {opened: boolean, setOpened: Function, str?: IModalHeader, children: JSX.Element | JSX.Element[], variant?: layout}) => {

    const navigate = useNavigate();
    return (
        <>
        <Modal 
            withCloseButton={false}
            opened={opened}
            onClose={() => setOpened(!opened)}
            centered
            padding={0}
            size={450}
        >
            <Container px={'40px'} py={'32px'}>
                <ModalContainer str={{...str}}>
                    <>{children}</>
                </ModalContainer>
                {variant === 'variant_1' &&
                    <>
                        <Button onClick={() => setOpened(false)} radius={'xl'} className='dfa-btn-gradient text-base w-full mt-8'>Dismissed</Button>
                        <Text onClick={() => navigate('/alert')} className="cursor-pointer text-center mt-4 text-white text-sm font-normal">Manage My Alerts</Text>
                    </>
                }
                {variant === 'variant_2' &&
                    <Center mt={'16px'}><Text className="text-xs">Click anywhere to dismiss.</Text></Center>
                }
            </Container>
        </Modal>
        </>
    )
}

export interface IModalHeader {
    primary?: string,
    secondary?: string,
}
const ModalContainer = ({str, children}: {str?: IModalHeader, children: JSX.Element}) => {

    return (
        <Container p={0}>
            {/* Modal Header */}
            <div className="inlined-component-centered flex-col mb-8">
                <DFAIcon/>
                <Text className="text-3xl font-semibold dfa-text-gradient mt-6">{str?.primary}</Text>
                <Text className="text-base font-normal mt-3">{str?.secondary}</Text>
            </div>
            {children}
        </Container>
    )
}