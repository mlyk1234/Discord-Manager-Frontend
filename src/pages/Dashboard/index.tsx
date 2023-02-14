import { Button, Checkbox, Container, NumberInput, Progress, Select, SelectItem, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/redux"
import { clearToken } from "../../shared/redux/features/auth.slice";
import { updateSessionStatus } from "../../shared/redux/features/session.slice";
import { ReactComponent as LightningIcon } from "../../asset/DFA/lightning.icon.svg";
import { DFAGrid } from "../../components/shared/DFAGrid";
import { integration_name } from "../../asset/integrations";
import { useForm } from "@mantine/form";
import { useCreateAlertMutation } from "../../shared/redux/api/price-alert.api";
import { DFAModal, IModalHeader } from "../../components/Modal";
import { AlertCount, AlertCountWidget } from "../../components/Alert/AlertCount";
import { ISupportedPair } from "../../shared/redux/features/price-feed.slice";

interface ISelectAlert {
    image?: string,
    label: string,
    value: string,
    description: string
}
export const data: ISelectAlert[]  = [
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      label: 'Bender Bending Rodríguez',
      value: 'Bender Bending Rodríguez',
      description: 'Fascinated with cooking',
    },
  
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
      label: 'Carol Miller',
      value: 'Carol Miller',
      description: 'One of the richest people on Earth',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
      label: 'Homer Simpson',
      value: 'Homer Simpson',
      description: 'Overweight, lazy, and often ignorant',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
      label: 'Spongebob Squarepants',
      value: 'Spongebob Squarepants',
      description: 'Not just a sponge',
    },
  ];

const notification_channel: integration_name[] = ['Telegram', 'Slack', 'Discord'];
const condition = ['above', 'below'];
const mapCondition = (type: string) => {
    if(type === 'above') return 'gte'
    else return 'lte';
}

export default function Dashboard () {
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

    console.log('notice me', priceFeedNetwork)

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
    }, [form.values.network])

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

    useEffect(() => {
        if(isSuccess) {
            setOpened(!opened);
            setModalMsg({
                primary: 'Alert Created',
                secondary: 'Success! Your alert has been saved.'
            })
        }
    }, [isSuccess])

    useEffect(() => {
        if(isError) {
            setModalMsg({
                primary: 'Unable to create alert',
                secondary: 'Please check the missing fields.'
            });
            setOpened(!opened);
        };
    }, [isError])


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
            <div className="inlined-wrapped text-dfa-grey text-base font-medium">
                <LightningIcon className="mr-2"/>
                <Text>The price of <span className="dfa-text-gradient">BTC</span> is currently</Text>&nbsp;
                <Text className="dfa-text-gradient">22,782.92 USD</Text>.
            </div>
            <div className="inlined-wrapped text-base text-white gap-2">
                <Checkbox/>
                <Text>Disable this alert after it triggers once.</Text>
            </div>
            <Button onClick={() => onSubmitAlert()} radius={'xl'} className='dfa-btn-gradient'>Set Alert</Button>
            <AlertCountWidget/>
        </DFAGrid>
    )
}