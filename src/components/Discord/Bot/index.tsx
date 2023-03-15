import axios from "axios";
import { Frame } from "../../shared/Framer/Framer";
import "./bot.scss";
import { useRef } from 'react';
import { Button, Select, TextInput, MultiSelect, Radio, SegmentedControl, Loader } from '@mantine/core';
// Datetime picker
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
// EO Datetime picker
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IBot } from "../ManageBot";
import { getJWT } from "../../../shared/services/axios";
import backendUrl from "../../../shared/constant";

const useGetOneBotDetails = () => {
    const [data, setData] = useState<IBot>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const getBot = async (acc_id: string) => {
      try {
        setIsLoading(true);
        const result = await axios.get(`${backendUrl}/discord/bot/${acc_id}`);
        if(result) {
          setData(result.data);
          setIsSuccess(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsSuccess(false);
      }
    }
    
    return {
        getBot,
        data,
        isSuccess,
        isLoading
    }
}

const useDeployBotToServer = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    const deployBot = async (acc_id: number, guild_id: string) => {
      try {
        setIsLoading(true);
        const payload = {
            acc_id: acc_id,
            guild_id: guild_id
        }
        const deploy_result = await axios.post(`${backendUrl}/discord/botjoin/`, payload);
        if(deploy_result) {
          setIsSuccess(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsSuccess(false);
        setIsLoading(false);
        setIsError(true);
      }
    }
    
    return {
        deployBot,
        isSuccess,
        isLoading,
        isError
    }
}

const getChannelsByServerIdAPI = async (loginToken: string, guild_id: string) => {
    return await axios.get(`https://discord.com/api/v9/guilds/${guild_id}/channels`, {
        headers: {
            Authorization: loginToken
        }
    })
}

const useGetAllServers = () => {
    const [servers, setServers] = useState<ISelectOptions[]>();
    const [isLoadingGetServers, setIsLoadingGetServers] = useState<boolean>(false);

    const getServers = async () => {
        try {
            setIsLoadingGetServers(true);
            const result = await axios.get(`${backendUrl}/discord/guild`, {
                ...getJWT()
            });
            const { data } = result.data;
            const guilds: ISelectOptions[] = [];
            if(data && data.length > 0) {
                data.forEach((v: any) => {
                    guilds.push({
                        value: v.guild_id,
                        label: v.guild_name
                    })
                });
            }
            setServers(guilds);
            setIsLoadingGetServers(false);
        } catch (error) {
            setIsLoadingGetServers(false);
            console.log(error)
        }
    }
    return {
        getServers,
        servers,
        isLoadingGetServers
    }
}

interface ISelectOptions {value: string, label: string}
interface BotData {
    acc_id: string,
    loginToken: string
}
export default function Bot() {
    const ref = useRef<HTMLInputElement>();
    // const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { state }: { state: BotData } = location;
    const { getBot, data, isSuccess, isLoading } = useGetOneBotDetails();
    const { deployBot, isSuccess: isSuccessDeployBot, isError, isLoading: isLoadingDeploy } = useDeployBotToServer();
    const [botData, setBotData] = useState<IBot>()
    const [defaultSelectServer, setDefaultSelectServer] = useState<string | null>(null);
    const [isJoined, setIsJoined] = useState(false);
    const { getServers, servers } = useGetAllServers()

    useEffect(() => {
        if(state) {
            getBot(state.acc_id)
        }
    }, []);

    useEffect(() => {
        getServers();
    }, [])

    useEffect(() => {
        if(data) {
            setBotData(data);
            if(data.settings.length > 0 && servers) {
                data.settings.forEach(v => {
                    const find = servers.find((k) => k.value === v.joinedGuild);
                    if(find) {
                        setIsJoined(true);
                    } else {
                        setIsJoined(false);
                    }
                })
            }
        }
    }, [data])

    const [textChannels, setTextChannels] = useState<ISelectOptions[]>([]);
    const [voiceChannels, setVoiceChannels] = useState<ISelectOptions[]>([]);
    const onSelectHandler = async (val: string | null) => {
        if(val) {
            setDefaultSelectServer(val);
            if(data && data.settings.length > 0) {
                const find = data.settings.find((k) => k.joinedGuild === val);
                if(find) {
                    setIsJoined(true);
                    interface DiscordChannel { id: string, name: string, type: number };
                    const { data: channelsByServerId } = await getChannelsByServerIdAPI(data.loginToken, val);
                    const tempTextChannel: ISelectOptions[] = [];
                    const tempVoiceChannel: ISelectOptions[] = [];
                    channelsByServerId.forEach((c: DiscordChannel)  => {
                        switch(c.type) {
                            case 0:
                                tempTextChannel.push({
                                    value: c.id,
                                    label: c.name
                                });
                                break;
                            case 2:
                                tempVoiceChannel.push({
                                    value: c.id,
                                    label: c.name
                                });
                                break;
                            default:
                                break;
                        }
                    })
                    setTextChannels(tempTextChannel);
                    setVoiceChannels(tempVoiceChannel);
                } else {
                    setIsJoined(false);
                }
            }
        }
    }

    const joinHandler = async () => {
        try {
            if(defaultSelectServer) {
                await deployBot(Number(state.acc_id), defaultSelectServer);
            }
        } catch (error) {
            console.log('[joinHandler]',error);
        }
    }

    const [botAction, setBotAction] = useState<string | null>(null);

    const { fetchReplies, replies, isSuccessFetchReplies, isLoadingFetchReplies } = useFetchAllRepliesInChannel();

    const onSelectTextType = async (type: string | null) => {
        setBotAction(type);
        if(type === 'react') {
            if(data) await fetchReplies(channelId, data);
        }
    }
    const [channelId, setChannelId] = useState<string | null>(null);

    const [sendTextOption, setSendTextOption] = useState<string>("Manual");
    const { getQA, questionnaires, isLoadingGetQA } = useGetQA();
    const changeTextOption = async (v: string) => {
        setSendTextOption(v);
        if(v === "general" || v === "thirdfi") {
            await getQA(v);
            console.log(questionnaires)
        }
    }
    const selectChannelHandler = async (v: string | null) => {
        setChannelId(v);
        if(data) {
            console.log('Selected Channel')
        }
    }
    const [inputText, setInputText] = useState<string>('');

    const [isReply, setIsReply] = useState<string>("OFF");
    const [messasgeId, setMessageId] = useState<string | null>(null);
    const radioReplyHandler = async (value: string) => {
        if(value === "ON") {
            setIsReply(value)
            if(data) await fetchReplies(channelId, data);
        } else {
            setMessageId(null);
            setIsReply(value);
        }
    }
    const [triggerAction, setTriggerAction] = useState<string>("IMMEDIATE");
    const [timestamp, setTimeStamp] = useState<number>();
    const dateTimeHandler = (value: string | moment.Moment) => {
        const timestampValue = new Date(value.toString()).getTime();
        setTimeStamp(timestampValue)
    }

    const [inputReact, setInputReact] = useState<string[]>([])
    const handleSubmit = async () => {
        try {
            let payload: ISendText | ISendReact;
            if(botAction === "text") {
                payload = {
                    loginToken: state.loginToken,
                    guild_id: defaultSelectServer,
                    channel_id: channelId,
                    text: inputText,
                }
                if(isReply === 'ON' && messasgeId !== null) {
                    payload = {
                        ...payload,
                        is_reply: true,
                        message_id: messasgeId
                    }
                }
                if(triggerAction === "SPECIFIC") {
                    payload = {
                        ...payload,
                        scheduledAt: timestamp,
                    }
                }
    
                await sendTextAPI(payload);
            } else {
                payload = {
                    loginToken: state.loginToken,
                    guild_id: defaultSelectServer,
                    channel_id: channelId,
                    message_id: messasgeId,
                    react: inputReact
                }
                await sendReactAPI(payload)
            }

        } catch (error) {
            console.log('[handleSubmit] failed.')
        }
    }
    return (
        <Frame>
            <div className="flex flex-col items-center">
                <div className="bot-root">
                    <div className="view-bot">
                        <span>Currently Viewing</span>
                        <div>{botData?.acc_id}</div>
                        <div>{botData?.username}</div>
                        <div>{botData?.emailAddress}</div>
                    </div>
                    <div>
                        <div className="text-white font-bold text-center">Pick a server</div>
                        {isLoadingDeploy &&
                            <div className="flex flex-row justify-center items-center"><Loader/></div>
                        }
                        {!isLoadingDeploy &&
                            <Select
                                onChange={(v) => onSelectHandler(v)}
                                placeholder="Pick one"
                                data={ servers && servers.length > 0 ? servers : [] }
                            />
                        }
                        {isLoadingDeploy &&
                            <div>Please wait while joining the server</div>
                        }
                        {!isLoadingDeploy &&
                            <Button fullWidth disabled={isJoined ? true : false} onClick={() => joinHandler()}>Join Server</Button>
                        }
                        {isError &&
                            <div className="text-red-700 text-center font-bold">Unable to join. Try again.</div>
                        }
                        {isSuccessDeployBot &&
                            <div className="text-green-500 text-center font-bold">Success Joining Server</div>
                        }
                    </div>
                </div>
                {defaultSelectServer && isJoined &&
                    <div className="root-channel-type">
                        <div>
                            <div className="font-bold text-white">Text Channel</div>
                            <Select
                                onChange={(v) => {
                                    selectChannelHandler(v);
                                    radioReplyHandler('OFF');
                                }}
                                placeholder="Pick one"
                                data={textChannels}
                            />
                            <Select
                                onChange={(v) => onSelectTextType(v)}
                                placeholder="Do What"
                                data={[{
                                    value: "text",
                                    label: "Send a text"
                                }, {
                                    value: "react",
                                    label: "React"
                                }]}
                            />
                            {botAction === 'text' &&
                                <div>
                                    <SegmentedControl
                                        value={sendTextOption}
                                        onChange={(v) => changeTextOption(v)}
                                        fullWidth
                                        data={[{
                                            label: "Manual", value: "Manual"
                                        }, {
                                            label: "General", value: "general"
                                        }, {
                                            label: "Specific", value: "thirdfi"
                                        }]}
                                    />
                                    {sendTextOption === "Manual" &&
                                        <TextInput onChange={(v) => setInputText(v.target.value)} placeholder="Enter text"/>
                                    }
                                    {sendTextOption !== "Manual" &&
                                        <Select
                                            onChange={(v) => {
                                                if(v) setInputText(v)
                                            }}
                                            dropdownPosition="bottom"
                                            data={ questionnaires && questionnaires.length > 0 ? questionnaires : [] }
                                        />
                                    }
                                    <div>Reply</div>
                                    <Radio.Group
                                        value={isReply}
                                        onChange={(v) => radioReplyHandler(v)}
                                    >
                                        <Radio value={"ON"} label="ON"/>
                                        <Radio value={"OFF"} label="OFF"/>
                                    </Radio.Group>
                                    {isReply === "ON" && !isLoadingFetchReplies &&
                                        <>
                                            <div>Reply to:</div>
                                            <Select
                                                dropdownPosition="bottom"
                                                onChange={(v) => setMessageId(v)}
                                                data={replies && replies.length > 0 ? replies : []}
                                            />
                                        </>
                                    }
                                    {isLoadingFetchReplies &&
                                        <div>Loading</div>
                                    }
                                </div>
                            }
                            {botAction === 'react' &&
                                <div>
                                    <MultiSelect
                                        onChange={(v) => setInputReact(v)}
                                        limit={2}
                                        data={["💻", "👨‍🎓", "💰", "📈", "⚡", "🚀", "🔥", "👏", "❤️‍🔥", "💯", "🎉", "👀", "🤩", "👍", "📌"]}
                                        dropdownPosition='bottom'
                                    />
                                    <div>This will react to a latest text</div>
                                    <div className="font-bold text-white">Advance</div>
                                    {!isLoadingFetchReplies &&
                                        <>
                                            <div>React to:</div>
                                            <Select
                                                dropdownPosition="bottom"
                                                onChange={(v) => setMessageId(v)}
                                                data={replies && replies.length > 0 ? replies : []}
                                            />
                                        </>
                                    }
                                    {isLoadingFetchReplies &&
                                        <div>Loading</div>
                                    }
                                </div>
                            }
                            <div>
                                <div>Immediate?</div>
                                <Radio.Group
                                    value={triggerAction}
                                    onChange={setTriggerAction}
                                >
                                    <Radio value={"IMMEDIATE"} label={"YES"}/>
                                    <Radio value={"SPECIFIC"} label={"NO"}/>
                                </Radio.Group>
                                {triggerAction === 'SPECIFIC' &&
                                    <Datetime
                                        onChange={dateTimeHandler}
                                    />
                                }
                            </div>
                            <Button onClick={handleSubmit} type="button" className="dfa-btn-gradient w-full">Submit</Button>
                        </div>
                        <div>
                            Voice Channel
                            <Select
                                placeholder="Pick one"
                                data={voiceChannels}
                            />
                            <Button disabled className="w-full dfa-btn-gradient">Join Voice (TBA)</Button>
                        </div>
                    </div>
                }
                {!defaultSelectServer &&
                    <div>Please select Server First</div>
                }
            </div>
        </Frame>
    )
}
interface IBasePayload {
    channel_id: string | null,
    guild_id: string | null,
    loginToken: string,
    message_id?: string | null,
}
interface ISendText extends IBasePayload {
    text: string,
    is_reply?: boolean,
    scheduledAt?: number,
    config?: any;
}
const sendTextAPI = async (payload: ISendText) => {
    return await axios.post(`${backendUrl}/discord/send-text`, payload)
}
interface ISendReact extends IBasePayload {
    react: string[],
}
const sendReactAPI= async (payload: ISendReact) => {
    return await axios.post(`${backendUrl}/discord/send-react`, payload)
}
const useFetchAllRepliesInChannel = () => {
    const [replies, setReplies] = useState<any[]>();
    const [isSuccessFetchReplies, setIsSuccessFetchReplies] = useState(false);
    const [isLoadingFetchReplies, setIsLoadingFetchReplies] = useState(false);
  
    const fetchReplies = async (channel_id: string | null, userData: IBot) => {
        setIsLoadingFetchReplies(true);
        const result = await axios.get(`https://discord.com/api/v9/channels/${channel_id}/messages?limit=50`, {
            headers: {
                authorization: userData.loginToken
            }
        })
        const { data } = result;
        const filtered: ISelectOptions[] = [];
        if(data && data.length > 0) {
            data.forEach((v: any) => {
                if(v.author.username !== userData.username) {
                    filtered.push({
                        value: v.id,
                        label: `${v.content} - ${v.author.username}`
                    })
                }
            })
        }
        console.log(data)
        setIsLoadingFetchReplies(false);
        setReplies(filtered);
    }

    return {
        fetchReplies,
        replies,
        isSuccessFetchReplies,
        isLoadingFetchReplies
    }
}

const useGetQA = () => {
    const [questionnaires, setQuestionnaires] = useState<ISelectOptions[]>();
    const [isSuccessGetQA, setIsSuccessGetQA] = useState<boolean>(false);
    const [isLoadingGetQA, setIsLoadingGetQA] = useState<boolean>(false);

    const getQA = async (params: string) => {
        try {
            setIsLoadingGetQA(true);
            const result = await axios.get(`${backendUrl}/discord/questions/${params}`);
            const { data } = result.data;
            const mappedResult: ISelectOptions[] = [];
            if(data && data.length > 0) {
                data.forEach((v: any) => {
                    mappedResult.push({
                        value: v.text,
                        label: v.text
                    })
                })
            }
            setQuestionnaires(mappedResult);
            setIsLoadingGetQA(false);
        } catch (error) {
            setIsLoadingGetQA(false);
            console.log('[Error getQA]', error);
        }
    }

    return {
        getQA,
        questionnaires,
        isLoadingGetQA
    }
}