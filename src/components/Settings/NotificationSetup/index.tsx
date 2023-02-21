import { Badge, Button, Chip, Container, Input, Text } from "@mantine/core"
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { IntegrationIcon, IntegrationIconV2, integration_name } from "../../../asset/integrations";
import { useAppDispatch, useAppSelector } from "../../../shared/redux";
import { ReactComponent as VerifiedCheckIcon } from "../../../asset/common/verified-check.icon.svg";
import { saveUserNotificationSettings } from "./notification.api";
import { useGetNotificationSetupMutation } from "../../../shared/redux/api/notification-setup.api.";
import "./index.scss";

export const NotificationSetup = () => {

    return (
        <Container p={0} className='h-full'>
            <IntegrationList/>
        </Container>
    )
}

interface IIntegration {
    name: integration_name,
    icon: string,
    desc?: string,
    webhook_url?: boolean,
    status: boolean,
    connected: boolean,
    notificationsEnabled: boolean,
}
const initialIntegrations: IIntegration[] = [
    {
        name: 'Telegram',
        icon: '',
        desc: `Link your account with our Telegram bot to receive customizable DeFi alerts.`,
        status: true,
        connected: false,
        notificationsEnabled: false
    },
    {
        name: 'Slack',
        icon: '',
        desc: `Integrate your account with a Slack channel in seconds. Once logged in, simply click "Add to Slack", then select a workspace and channel.`,
        webhook_url: false,
        status: false,
        connected: false,
        notificationsEnabled: false
    },
    {
        name: 'Discord',
        icon: '',
        desc: `Integrate your account with any Discord server. You'll just need to provide us with a specific Webhook URL to send you messages.`,
        webhook_url: true,
        status: false,
        connected: false,
        notificationsEnabled: false
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

    const [slackUrl, setSlackUrl] = useState<string>('');
    const [telegramUrl, setTelegramUrl] = useState<string>('');
    const [errorDiscord, setErrorDiscord] = useState<boolean | null>(null);
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
        if(item === 'Slack') return slackUrl;
        else if (item === 'Telegram') return telegramUrl;
        else return '';
    }
    const [trigger] = useGetNotificationSetupMutation();
    useEffect(() => {
        integrations.forEach((v) => {
            if(Object.values(notificationState).find((item) => item.name === v.name).notificationsEnabled) v.notificationsEnabled = true;
            else v.connected = false;
        });
        setIntegrations([...integrations]);

    }, [notificationState, currentSetup]);
    
    useEffect(() => {
            setSlackStatus(notificationState.slackDetails.notificationsEnabled);
            setDiscordStatus(notificationState.discordDetails.notificationsEnabled);
            setTelegramStatus(notificationState.telegramDetails.notificationsEnabled);
            setDiscordWebhookUrl(notificationState.discordDetails.webhookURL);
            setEmailStatus(notificationState.emailDetails.notificationsEnabled);

            setSlackUrl(notificationState.slackDetails.authLink);
            setTelegramUrl(notificationState.telegramDetails.botlink);
            setDiscordWebhookUrl(notificationState.discordDetails.webhookURL)
        
    }, [notificationState.discordDetails.notificationsEnabled, notificationState.discordDetails.webhookURL, notificationState.emailDetails.notificationsEnabled, notificationState.slackDetails.authLink, notificationState.slackDetails.notificationsEnabled, notificationState.telegramDetails.botlink, notificationState.telegramDetails.notificationsEnabled]);

    useEffect(() => {
        if(currentSetup === 'Slack') {
            console.log(slackUrl)
            setLinkToConnect(slackUrl)
        } else if(currentSetup === 'Telegram') {
            console.log(telegramUrl)
            setLinkToConnect(telegramUrl)
        } else {
            return;
        }
    }, [currentSetup, notificationState.slackDetails.authLink, slackUrl, telegramUrl])

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
                if(!discordWebhookUrl) {
                    setErrorDiscord(true);
                    // eslint-disable-next-line no-throw-literal
                    throw 'Error Discord Webhook';
                }
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
                ).then(() => setErrorDiscord(false)).catch((err) => {
                    setErrorDiscord(true);
                });
            }
            await trigger();
        } catch (error) {
            console.log('[Error]: onSave', error)
        }
    }

    const onSetDiscordWebhookUrl = (str: string) => {
        setDiscordWebhookUrl(str);
        if(!str && str.length === 0) setErrorDiscord(true);
        else setErrorDiscord(false);
    }

    return (
        <>
        <Container p={0} className='w-full flex flex-col h-full'>
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
            <Container p={0} className="max-w-[400px] flex flex-col flex-grow items-center">
                <Text className="text-dfa-grey mt-8 text-center">{integrations.find(item => item.name === currentSetup)?.desc}</Text>
                {integrations.find(item => item.name === currentSetup)?.webhook_url && 
                    <div className="flex flex-col justify-center">
                        <Input width={"100%"} defaultValue={discordWebhookUrl} onChange={(v: BaseSyntheticEvent) => onSetDiscordWebhookUrl(v.target.value)} className="mt-8 w-[336px] flex items-center justify-center" radius={'xl'} placeholder="Enter webhook url"/>

                        {errorDiscord &&
                            <Text className="text-red-500 text-xs mt-2 text-center">Please enter valid <a target="_blank" href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" className="underline cursor-pointer">discord webhook url.</a></Text>
                        }
                        {discordStatus &&
                            <Text className="text-green-500 text-xs mt-2 text-center">Bot Connected</Text>
                        }
                    </div>
                }
                {!integrations.find(item => item.name === currentSetup)?.notificationsEnabled ?
                    <>
                        {currentSetup !== 'Discord' ?
                            <Button
                                onClick={() => {
                                    window.open(linkToConnet)
                                    onSave(currentSetup)
                                }}
                                radius={'xl'} className="dfa-btn-gradient mt-8">
                                Connect Now
                            </Button> :
                            <Button onClick={() => onSave(currentSetup) } radius={'xl'} className="dfa-btn-gradient mt-4 w-[124px]">
                                Save
                            </Button>
                        }
                        {/* <Text onClick={() => onSave(currentSetup)} className="cursor-pointer text-white text-base mt-3">Save</Text> */}
                        <div className="inlined-component-centered items-end gap-4 flex-grow mt-5">
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
                        {currentSetup !== 'Discord' ?
                            <Button
                                onClick={() => {
                                    window.open(linkToConnet)
                                    onSave(currentSetup)
                                }}
                                radius={'xl'} className="dfa-btn-gradient mt-8">
                                Reconnect
                            </Button> :
                            <Button onClick={() => onSave(currentSetup) } radius={'xl'} className="dfa-btn-gradient mt-4 w-[124px]">
                                Save
                            </Button>
                        }
                        <div className="notification-status items-end gap-4 flex-grow mt-5">
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

        </>
    )
}