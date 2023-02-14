import { Container, Divider, Tabs } from "@mantine/core"
import { useState } from "react"
import { AccountSettings } from "../../components/Settings/AccountSettings"
import { NotificationSetup } from "../../components/Settings/NotificationSetup"
import { DFAGrid } from "../../components/shared/DFAGrid"

export const Settings = () => {

    return (
        <DFAGrid str={{primary: 'Settings', secondary: 'Manage your account and preferences here.'}}>
            <Container p={0} className="w-full">
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
    component: <></>,
    disabled: true
}]

const SettingTabs = () => {
    const [tabs, setTabs] = useState<ITab[]>(tabData);
    return (
        <Container p={0} className="flex flex-col items-center text-center gap-[18px]">
            <Tabs className="w-full" defaultValue={'Account Settings'}>
                <Tabs.List>
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
                            <Tabs.Panel key={index} className="w-full" value={item.label}>{item.component}</Tabs.Panel>
                        )
                        :
                        null
                }
            </Tabs>
        </Container>
    )
}