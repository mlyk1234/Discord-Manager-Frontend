import { Container, Divider, Tabs } from "@mantine/core"
import { useState } from "react"
import { AccountSettings } from "../../components/Settings/AccountSettings"
import { NotificationSetup } from "../../components/Settings/NotificationSetup"
import Preferences from "../../components/Settings/Preferences"
import { DFAGrid } from "../../components/shared/DFAGrid/DFAGrid"
import "./index.scss";

export const Settings = () => {

    return (
        <DFAGrid str={{primary: 'Settings', secondary: 'Manage your account and preferences here.'}}>
            <Container p={0} className="w-full flex-grow flex flex-col">
                <Divider mb={32} className='border-dfa-grey'/>
                <SettingTabs/>
            </Container>
        </DFAGrid>
    )
}


interface ITab {
    label: string,
    component: JSX.Element,
    disabled?: boolean,
}
const tabData: ITab[] = [{
    label: 'Account Settings',
    component: <AccountSettings/>
}, {
    label: 'Notification Setup',
    component: <NotificationSetup/>
}, {
    label: 'Preferences',
    component: <Preferences/>,
    disabled: false
}]

const SettingTabs = () => {
    const [tabs, setTabs] = useState<ITab[]>(tabData);
    return (
        <Container p={0} className="flex flex-col items-center gap-[18px] flex-grow">
            <Tabs className="w-full flex-grow justify-start" defaultValue={'Account Settings'}>
                <Tabs.List className="tab-list-setting">
                    {tabs && tabs.length > 0 ?
                        tabs.map((item, index) => 
                            <Tabs.Tab key={index} value={item.label} disabled={item.disabled}>
                                <div className="dfa-tab">
                                    {item.label}
                                    <div className="dfa-line-1"></div>
                                </div>
                            </Tabs.Tab>)
                        :
                        null
                    }
                </Tabs.List>
                {tabs && tabs.length > 0 ?
                        tabs.map((item, index) => 
                            <Tabs.Panel key={index} className="w-full flex-grow" value={item.label}>{item.component}</Tabs.Panel>
                        )
                        :
                        null
                }
            </Tabs>
        </Container>
    )
}