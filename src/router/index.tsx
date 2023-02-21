import { Container, Modal } from "@mantine/core";
import { createContext, useContext, useEffect, useState, useTransition } from "react";
import { useAppSelector } from "../shared/redux";
import { DeFiAPIRoute } from "./sourceMap";

const AppRoute = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    return (
        // <CanActivateElement opened={true}>
            <DeFiAPIRoute authenticated={session === 'active' ? true : false}/>
        // </CanActivateElement>
    )
}

export default AppRoute;


export const useModal = () => {
    const [opened, setOpened] = useState(false);

    return {
        opened,
        setOpened
    }
}

interface ICanActivate {
    condition: boolean
}
const  CanActivate = createContext<ICanActivate>({condition: false});

const CanActivateElement = ({ opened = false, children }: {opened?: boolean, children: JSX.Element | JSX.Element[]}) => {
    const [shouldActivate, setShouldActivate] = useState(false);
    const { condition } = useContext(CanActivate);
    
    console.log('ehh', condition)
    return (
        <>
            <Modal
                opened={shouldActivate}
                onClose={() => setShouldActivate(!shouldActivate)}
            >
                <Container>DisplayCan</Container>
            </Modal>
            {children}
        </>
    )
}