import { Button, Checkbox, NumberInput, Select, Text } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { integration_name } from "../../../asset/integrations";
import { useAppSelector } from "../../../shared/redux";
import { useCreateAlertMutation } from "../../../shared/redux/api/price-alert.api";
import { DFAModal, IModalHeader } from "../../Modal"
import { DFAGrid } from "../../shared/DFAGrid";
import { AlertCount, AlertCountWidget } from "../AlertCount"
import { CurrentPriceWidget } from "../../shared/CurrentPriceWidget/CurrentPriceWidget";

interface ISelectAlert {
    image?: string,
    label: string,
    value: string,
    description: string
}

export const data: ISelectAlert[]  = [];

const notification_channel: integration_name[] = ['Telegram', 'Slack', 'Discord'];
const condition = ['above', 'below'];
const mapCondition = (type: string) => {
    if(type === 'above') return 'gte'
    else return 'lte';
}

export const AlertForm = () => {
    const [typeOfNotification, setTypeOfNotification] = useState<string[]>(notification_channel);
    const [typeOfNetwork, setTypeOfNetwork] = useState<string[]>([]);
    const [typeOfPair, setTypeOfPair] = useState<string[] | any[]>([]);
    const [modalMsg, setModalMsg] = useState<IModalHeader>({ primary: '', secondary: '' });
    const [opened, setOpened] = useState<boolean>(false);
    const priceFeedNetwork = useAppSelector((state) => state.priceFeedSlice);

    const [createAlert, { isLoading, isError, error, isSuccess }] = useCreateAlertMutation();

    const form = useForm({
        initialValues: { notify_via: '', network: '', pair: '', price_target: '', condition: '' },
    })

    useEffect(() => {
        if(priceFeedNetwork && priceFeedNetwork.length > 0) {
            const network: string[] = [];
            priceFeedNetwork.forEach((item) => {
                network.push(item.network);
            });
            setTypeOfNetwork(network);
        }
    }, [priceFeedNetwork]);

    useEffect(() => {
        if(form.values.network !== '' && priceFeedNetwork.length > 0) {
            const findPair = priceFeedNetwork.find((item) => item.network === form.values.network);
            const pair: string[] = [];
            if(findPair && findPair.supported_pair) {
                findPair.supported_pair.forEach((item) => {
                    pair.push(item.pair);
                })
                setTypeOfPair(pair);
            }
        }
        return;
    }, [form.values.network]);

    useEffect(() => {
        if(isSuccess) {
            setOpened(!opened);
            setModalMsg({
                primary: 'Alert Created',
                secondary: 'Success! Your alert has been saved.'
            })
        }
    }, [isSuccess]);

    useEffect(() => {
        if(isError) {
            setModalMsg({
                primary: 'Unable to create alert',
                secondary: 'Please check the missing fields.'
            });
            setOpened(!opened);
        };
    }, [isError]);

    
    const onSubmitAlert = () => {
        const watch = `${form.values.network}-${form.values.pair}`;
        const condition = mapCondition(form.values.condition);
        createAlert({
            watch,
            price_target: Number(form.values.price_target),
            condition,
            channel: form.values.notify_via
        });
    };

    return (
        <DFAGrid str={{primary: 'Price Alert', secondary: 'Get notified when a coin goes above or below a price target.'}}>
            <DFAModal opened={opened} setOpened={setOpened} 
                str={{primary: modalMsg.primary, secondary: modalMsg.secondary}}
            >
                <AlertCount type='variant_2'/>
            </DFAModal>
            <div className="inlined-component-centered gap-4">
                <Text className="text-white">Select network chain</Text>
                <Select
                    {...form.getInputProps('network')}
                    // onChange={(v) => onSelectChain(v)}
                    className="w-[124px]"
                    radius={'xl'}
                    data={typeOfNetwork}
                    placeholder='Network'
                />
            </div>
            <div className="inlined-wrapped gap-4 text-[20px] text-white">
                <Text>Send me an</Text>
                <Select
                    {...form.getInputProps('notify_via')}
                    className="w-[153px]"
                    radius={'xl'}
                    data={typeOfNotification}
                    placeholder='Notification'
                />
                <Text>as soon as</Text>
                <Select
                    {...form.getInputProps('pair')}
                    className="w-[124px]"
                    radius={'xl'}
                    data={typeOfPair}
                    placeholder='Pair'
                />
                <Text>goes</Text>
                <Select
                    {...form.getInputProps('condition')}
                    className="w-[134px]"
                    radius={'xl'}
                    data={condition}
                    placeholder='Condition'
                />
                <Text>the price of</Text>
                <NumberInput
                    {...form.getInputProps('price_target')}
                    value={0.00}
                    className="w-[201px]"
                    radius={'xl'}
                    precision={2}
                />
                <Text>on chain.</Text>
            </div>
            <CurrentPriceWidget/>
            <div className="inlined-wrapped text-base text-white gap-2">
                <Checkbox/>
                <Text>Disable this alert after it triggers once.</Text>
            </div>
            <Button onClick={() => onSubmitAlert()} radius={'xl'} className='dfa-btn-gradient'>Set Alert</Button>
            <AlertCountWidget/>
        </DFAGrid>
    )
}