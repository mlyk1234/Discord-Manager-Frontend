import { Button, Footer, Header, Text } from '@mantine/core';
import { ReactComponent as ReactLogo } from "../../asset/DFA/dfa.icon.svg";
import { DropDown } from "../shared/Dropdown";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function AppHeader() {
    const navigate = useNavigate();
    let session = "inactive"

    if(session === 'active') {
        return (
            <Header className="dfa-header" height={60} p="xs">
                <div className="inlined-between">
                    <ReactLogo className="cursor-pointer" onClick={() => navigate('/dashboard')} height={'32px'}/>
                    <div className="inlined-component gap-4">
                        <Button radius={'xl'} className="dfa-btn-gradient">Upgrade</Button>
                        <DropDown/>
                    </div>
                </div>
            </Header>
        )
    } else {
        return <></>
    }
}

function AppFooter() {

    let session = "inactive"

    if(session === 'active') {
        return (
            <Footer className="dfa-footer" height={60} p="md">
                <div className="inlined-between">
                    <ReactLogo height={'32px'}/>
                    <Text className="text-white">© 2023 Community Bot. All rights reserved. Powered by Unknown</Text>
                </div>
            </Footer>
        )
    } else {
        return <></>
    }
}

const DeFiAlert = ({children}: {children: JSX.Element}) => {}

DeFiAlert.AppHeader = AppHeader;
DeFiAlert.AppFooter = AppFooter;

export default DeFiAlert;

// type _CALL_FOR = 'header' | 'footer';
// const _APP = [AppFooter, AppHeader]

// export const DeFiAlert2 = ({children}: {children: JSX.Element}) => {

//     const session = useAppSelector((state) => state.sessionSlice.session_status)
//         return {
//             SOMETHING: AppFooter
//         }
    
// }
