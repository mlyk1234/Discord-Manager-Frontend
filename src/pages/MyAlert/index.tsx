import { Button, Container, Divider, Progress, Tabs, Text } from "@mantine/core"
import { useState } from "react"
import { ActiveAlert } from "../../components/Alert/ActiveAlert"
import { AlertCount } from "../../components/Alert/AlertCount";
import { AlertHistory } from "../../components/Alert/AlertHistory";
import { DFAGrid } from "../../components/shared/DFAGrid"
import './index.scss';
export const MyAlert = () => {

    return (
        <DFAGrid str={{primary: 'My Alert', secondary: 'View and manage all your crypto alerts in one place.'}}>
            <Container className="w-full">
                <AlertCount/>
                <Divider mt={32} mb={32} className='border-dfa-grey'/>
                <AlertTabs/>
            </Container>
        </DFAGrid>
    )
}



interface ITab {
    label: string,
    component: JSX.Element
}
const tabData: ITab[] = [{
    label: 'Active Alert',
    component: <ActiveAlert/>
}, {
    label: 'Alert History',
    component: <AlertHistory/>
}]

const AlertTabs = () => {
    const [tabs, setTabs] = useState<ITab[]>(tabData);
    return (
        <Container p={0} className="flex flex-col items-center text-center gap-[18px]">
            <Tabs defaultValue={'Active Alert'}>
                <Tabs.List>
                    {tabs && tabs.length > 0 ?
                        tabs.map(item => 
                            <Tabs.Tab value={item.label}>
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
                        tabs.map(item => <Tabs.Panel className="w-[100vw]" value={item.label}>{item.component}</Tabs.Panel>)
                        :
                        null
                }
            </Tabs>
        </Container>
    )
}