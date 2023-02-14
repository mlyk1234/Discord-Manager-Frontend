import { Badge, Button, Chip, Container, Input, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import { IntegrationIcon, IntegrationIconV2, integration_name } from "../../../asset/integrations";
import { useAppDispatch, useAppSelector } from "../../../shared/redux";
import { ReactComponent as VerifiedCheckIcon } from "../../../asset/common/verified-check.icon.svg";
import { saveUserNotificationSettings } from "./notification.api";
import { useLazyGetNotificationSetupQuery } from "../../../shared/redux/api/notification-setup.api.";

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
    status: boolean,
    connected: boolean,
}
const initialIntegrations: IIntegration[] = [
    {
        name: 'Telegram',
        icon: '',
        desc: `Link your account with our Telegram bot to receive customizable DeFi alerts.`,
        status: true,
        connected: false
    },
    {
        name: 'Slack',
        icon: '',
        desc: `Integrate your account with a Slack channel in seconds. Once logged in, simply click "Add to Slack", then select a workspace and channel.`,
        webhook_url: false,
        status: false,
        connected: false,
    },
    {
        name: 'Discord',
        icon: '',
        desc: `Integrate your account with any Discord server. You'll just need to provide us with a specific Webhook URL to send you messages.`,
        webhook_url: true,
        status: false,
        connected: false
    }
];

const IntegrationList = () => {
    const [integrations, setIntegrations] = useState<IIntegration[]>(initialIntegrations);
    const [currentSetup, setCurrentSetup] = useState<integration_name>('Telegram'); // Default
    const [linkToConnet, setLinkToConnect] = useState<string>('');
    const notificationState = useAppSelector((state) => state.notificationSlice);
    const jwtTemp = useAppSelector((state) => state.authSlice.access_token);
    const [slackStatus, setSlackStatus] = useState<boolean>(false);
    const [discordStatus, setDiscordStatus] = useState<boolean>(false);
    const [telegramStatus, setTelegramStatus] = useState<boolean>(false);
    const [discordWebhookUrl, setDiscordWebhookUrl] = useState<string>('');
    const [emailStatus, setEmailStatus] = useState<boolean>(false);

    const onSelectMode = (item: integration_name) => {
        setCurrentSetup(item);
        integrations.forEach((v) => {
            if(v.name === item) v.status = true;
            else v.status = false;
        });
        Object.values(notificationState).find((item) => item.name === item)
        setLinkToConnect(connectionLink(item));
        setIntegrations([...integrations]);
    }

    const connectionLink = (item: integration_name) => {
        if(item === 'Slack') return notificationState.slackDetails.authLink;
        else if (item === 'Telegram') return notificationState.telegramDetails.botlink;
        else return '';
    }
    const [trigger] = useLazyGetNotificationSetupQuery();
    useEffect(() => {
        integrations.forEach((v) => {
            if(Object.values(notificationState).find((item) => item.name === v.name).connected) v.connected = true;
            else v.connected = false;
        });
        setIntegrations([...integrations]);

        setSlackStatus(notificationState.slackDetails.notificationsEnabled);
        setDiscordStatus(notificationState.discordDetails.notificationsEnabled);
        setTelegramStatus(notificationState.telegramDetails.notificationsEnabled);
        setDiscordWebhookUrl(notificationState.discordDetails.webhookURL);
        setEmailStatus(notificationState.emailDetails.notificationsEnabled);

    }, [notificationState, currentSetup]);

    const onSave = async (item: integration_name) => {
        try {
            if(item === 'Slack') {
                await saveUserNotificationSettings
                (
                    discordStatus,
                    telegramStatus,
                    true,
                    true,
                    telegramStatus,
                    discordWebhookUrl,
                    emailStatus,
                    jwtTemp
                );
            } else if(item === 'Telegram') {
                await saveUserNotificationSettings
                (
                    discordStatus,
                    true,
                    slackStatus,
                    slackStatus,
                    true,
                    discordWebhookUrl,
                    emailStatus,
                    jwtTemp
                );
            } else if (item === 'Discord') {
                await saveUserNotificationSettings
                (
                    true,
                    telegramStatus,
                    slackStatus,
                    slackStatus,
                    telegramStatus,
                    discordWebhookUrl,
                    emailStatus,
                    jwtTemp
                );
            }
            await trigger();
        } catch (error) {
            console.log('[Error]: onSave')
        }
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
                {!integrations.find(item => item.name === currentSetup)?.connected ?
                    <>
                        <Button
                        onClick={() => 
                            window.open(linkToConnet)
                        }
                        radius={'xl'} className="dfa-btn-gradient mt-8">
                            Connect Now
                        </Button>
                        <Text onClick={() => onSave(currentSetup)} className="cursor-pointer text-white text-base mt-3">Save</Text>
                        <div className="inlined-component-centered gap-4 mt-[132px]">
                            <Text className="text-dfa-grey">Status:</Text>
                            <Badge className="dfa-badge-default">
                                <div className="inlined-component bg-div w-full h-full gap-[10px]">
                                    <Text className="text-white text-base capitalize">Not Configured</Text>
                                </div>
                            </Badge>
                        </div>
                    </>
                     :
                    <>
                        <Button radius={'xl'} className="dfa-btn-gradient mt-8">Disconnect</Button>
                        <div className="inlined-component-centered gap-4 mt-[132px]">
                            <Text className="text-dfa-grey">Status:</Text>
                            <Badge className="dfa-badge-configured">
                                <div className="inlined-component bg-div w-full h-full gap-[10px]">
                                    <Text className="dfa-text-gradient text-base capitalize">Verified</Text><VerifiedCheckIcon width={20} height={20}/>
                                </div>
                            </Badge>
                        </div>
                    </>
                }
            </Container>
        </Container>
    )
}