import { ActionIcon, Button, Collapse, Container, MultiSelect, Text } from "@mantine/core";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { IconZoomQuestion } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetUserSettingMutation, useUpdateUserSettingMutation } from "../../../shared/redux/api/user-setting.api";
import "./index.scss";

export default function Preferences() {
    const highlight = ['PAIR', 'CHAIN', 'CONDITION'];
    const [updateUserSetting, { isSuccess }] = useUpdateUserSettingMutation();
    const [trigger, { data }] = useGetUserSettingMutation();
    const [clickedHelp, setClickedHelp] = useState(false);
    useEffect(() => {
        fn();
        async function fn() {
            await trigger();
        }
    }, [])

    useEffect(() => {
        if(data && data.msgText) {
            setInitialMessageTextInput(data.msgText);
        }
        if(data && data.titleText) {
            setInitialTitleTextInput(data.titleText);
        }
    }, [data, trigger])

    const [initialTitleTextInput, setInitialTitleTextInput] = useState('Alert - $PAIR 🚀');
    const [initialMessageTextInput, setInitialMessageTextInput] = useState('Price went $CONDITION $PRICE ! 🚩');
    const RenderTitle = () => {
        const textMap = initialTitleTextInput.replaceAll('$PAIR', 'BTCUSD').replaceAll('$CONDITION', 'above').replaceAll('$PRICE', '$25,550.30').replaceAll('$NETWORK', 'POLYGON');

        return (
            <Text className="text-green-500 text-xs">{`${textMap}`}</Text>
        )
    }

    const RenderMessage = () => {
        const textMap = initialMessageTextInput.replaceAll('$PAIR', 'BTCUSD').replaceAll('$CONDITION', 'above').replaceAll('$PRICE', '$25,550.30').replaceAll('$NETWORK', 'POLYGON');

        return (
            <Text className="text-green-500 text-xs">{`${textMap}`}</Text>
        )
    }

    const onChangeTitleHandler = (e: string) => {
        setInitialTitleTextInput(e)
    }
    const onChangeMessageHandler = (e: string) => {
        setInitialMessageTextInput(e)
    }
    const onSubmitV2 = () => {
        const alert_text = {
            titleText: initialTitleTextInput,
            msgText: initialMessageTextInput
        }
        updateUserSetting({alert_text: alert_text});
    }

    return (
        <Container p={0} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-3 preference-container">
                <div className="flex flex-col justify-center items-center">
                    <ActionIcon onClick={() => setClickedHelp(!clickedHelp)}>
                        <IconZoomQuestion/>
                    </ActionIcon>
                    <Collapse in={clickedHelp}>
                        <Container p={0} className="text-dfa-grey text-base">
                            <div>You can use a reserved keywords start with '$' Sign</div>
                            
                            <div className="flex flex-col text-sm">
                            <div>Reserved keywords:</div>
                            <div>$PAIR - Currency pair</div>
                            <div>$PRICE - Price of the pair</div>
                            <div>$CHAIN - Network chain</div>
                            <div>$CONDITION - The price action 'above | below'</div>
                            </div>
                        </Container>
                    </Collapse>
                </div>
                <Text className="text-white">Define your alert title</Text>
                <TextInput
                    name="title"
                    value={initialTitleTextInput}
                    onChange={(v: string) => onChangeTitleHandler(v)} 
                    trigger={["$"]} options={{"$": ["PAIR", "PRICE", "CONDITION", "NETWORK"]}}
                    placeholder="Start typing"/>
                <div>
                    <Text className="text-white text-sm">Preview Title</Text>
                    <RenderTitle></RenderTitle>
                </div>

                <Text className="text-white">Define your alert Message</Text>
                <TextInput
                    name="title"
                    value={initialMessageTextInput}
                    onChange={(v: string) => onChangeMessageHandler(v)} 
                    trigger={["$"]} options={{"$": ["PAIR", "PRICE", "CONDITION", "NETWORK"]}}
                    placeholder="Start typing"/>
                <div>
                    <Text className="text-white text-sm">Preview Message</Text>
                    <RenderMessage></RenderMessage>
                </div>

                <Button onClick={onSubmitV2} radius={'xl'} className="dfa-btn-gradient">Save</Button>

            </div>
            {isSuccess &&
                <Text className="text-green-500 text-center text-xs">Saved!</Text>
            }
        </Container>
    )
}