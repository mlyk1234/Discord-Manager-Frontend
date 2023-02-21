import { ReactComponent as TGIcon } from './tg.icon.svg';
import { ReactComponent as TGEnabledIcon } from './tg-enabled.icon.svg';
import { ReactComponent as SlackIcon } from './slack.icon.svg';
import { ReactComponent as SlackEnabledIcon } from './slack-enabled.icon.svg';
import { ReactComponent as DiscordIcon } from './discord.icon.svg';
import { ReactComponent as DiscordEnableIcon } from './discord-enabled.icon.svg';
import { useEffect, useState } from 'react';

export enum INTEGRATION {
    TELEGRAM = "Telegram",
    SLACK = "Slack",
    DISCORD = "Discord",
    UNKNOWN = "Unknown"
}
export type integration_name = 'Telegram' | 'Slack' | 'Discord';

export const IntegrationIcon = ({icon = INTEGRATION.TELEGRAM, mode = false}: {icon: integration_name, mode: boolean}) => {
    const [callFor, setCallFor] = useState<JSX.Element>(<></>);

    useEffect(() => {
        switch(icon) {
            case INTEGRATION.TELEGRAM:
                !mode ? setCallFor(<TGIcon/>) : setCallFor(<TGEnabledIcon/>);
                break;
            case INTEGRATION.SLACK:
                !mode ? setCallFor(<SlackIcon/>) : setCallFor(<SlackEnabledIcon/>);
                break;
            case INTEGRATION.DISCORD:
                !mode ? setCallFor(<DiscordIcon/>) : setCallFor(<DiscordEnableIcon/>);
                break;
            default:
                setCallFor(<></>);
        }
    }, [icon, mode])

    return (
        <>{callFor}</>
    )
}

// On clicked state only


export const IntegrationIconV2 = ({icon = 'Telegram', focus = false, mode = false}: {icon: integration_name, focus?: boolean, mode: boolean}) => {
    const [callFor, setCallFor] = useState<JSX.Element>();

    useEffect(() => {
        switch(icon) {
            case 'Telegram':
                !mode ? setCallFor(<TGIcon/>) : setCallFor(<TGEnabledIcon/>);
                break;
            case 'Slack':
                !mode ? setCallFor(<SlackIcon/>) : setCallFor(<SlackEnabledIcon/>);
                break;
            case 'Discord':
                !mode ? setCallFor(<DiscordIcon/>) : setCallFor(<DiscordEnableIcon/>);
                break;
            default:
                setCallFor(<></>);
        }
    }, [icon, mode])


    return (
        <>{callFor}</>
    )
}