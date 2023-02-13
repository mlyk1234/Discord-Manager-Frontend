import { Button, Container, Modal, Text } from "@mantine/core"
import { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DFAIcon } from "../../asset/DFA/bell.icon.svg";
export const DFAModal = ({opened, setOpened, str, children}: {opened: boolean, setOpened: Function, str?: IModalHeader, children: JSX.Element | JSX.Element[]}) => {

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
                <Button onClick={() => setOpened(false)} radius={'xl'} className='dfa-btn-gradient text-base w-full mt-8'>Dismissed</Button>
                <Text onClick={() => navigate('/alert')} className="cursor-pointer text-center mt-4 text-white text-sm font-normal">Manage My Alerts</Text>
            </Container>
        </Modal>
        </>
    )
}

interface IModalHeader {
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