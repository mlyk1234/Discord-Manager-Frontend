import { Badge, Button, Chip, Container, Input, Text } from "@mantine/core"
import { useState } from "react";
import { IntegrationIcon, IntegrationIconV2, integration_name } from "../../../asset/integrations";

export const NotificationSetup = () => {

    return (
        <Container p={0}><IntegrationList/></Container>
    )
}

interface IIntegration {
    name: integration_name,
    icon: string,
    desc?: string,
    webhook_url?: boolean,
    status: boolean
}
const initialIntegrations: IIntegration[] = [
    {
        name: 'Telegram',
        icon: '',
        desc: `Link your account with our Telegram bot to receive customizable DeFi alerts.`,
        status: true,
    },
    {
        name: 'Slack',
        icon: '',
        desc: `Integrate your account with a Slack channel in seconds. Once logged in, simply click "Add to Slack", then select a workspace and channel.`,
        webhook_url: false,
        status: false
    },
    {
        name: 'Discord',
        icon: '',
        desc: `Integrate your account with any Discord server. You'll just need to provide us with a specific Webhook URL to send you messages.`,
        webhook_url: true,
        status: false
    }
];

const IntegrationList = () => {
    const [integrations, setIntegrations] = useState<IIntegration[]>(initialIntegrations);
    const [currentSetup, setCurrentSetup] = useState<integration_name>('Telegram');
    const [focus, setFocus] = useState(false);
    const onSelectMode = (item: integration_name) => {
        setCurrentSetup(item);

        integrations.forEach((v) => {
            if(v.name === item) {
                v.status = true;
            } else {
                v.status = false;
            }
        });
        // setIntegrations([...]);
        setIntegrations([...integrations]);
    }

    return (
        <Container p={0} className='w-full flex flex-col'>
            <Container p={0} className='w-full flex flex-row justify-center items-center gap-[50px]'>
                {integrations && integrations.length > 0 ?
                    <>
                    {integrations.map((item, index) => 
                        <div onClick={() => onSelectMode(item.name)} className="cursor-pointer">
                            <IntegrationIconV2 key={index} icon={item.name} mode={item.status}></IntegrationIconV2>
                        </div>
                    )}
                    </> :
                    null
                }
            </Container>
            <Container p={0} className="w-[400px]">
                <Text className="text-dfa-grey mt-8">{integrations.find(item => item.name === currentSetup)?.desc}</Text>

                {integrations.find(item => item.name === currentSetup)?.webhook_url && 
                    <Input className="mt-8" radius={'xl'} placeholder="Enter webhook url"/>
                }
                
                <Button radius={'xl'} className="dfa-btn-gradient mt-8">Connect Now</Button>
                <div className="inlined-component-centered gap-4">
                    <Text className="text-dfa-grey">Status:</Text>
                    <Badge className="text-white">Not configured</Badge>
                </div>
            </Container>
        </Container>
    )
}