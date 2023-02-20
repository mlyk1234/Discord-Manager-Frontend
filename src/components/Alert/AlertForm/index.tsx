import { Button, Checkbox, NumberInput, Select, Text } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { integration_name } from "../../../asset/integrations";
import { useAppSelector } from "../../../shared/redux";
import { useCreateAlertMutation, useModifyAlertMutation } from "../../../shared/redux/api/price-alert.api";
import { DFAModal, IModalHeader } from "../../Modal"
import { DFAGrid } from "../../shared/DFAGrid/DFAGrid";
import { AlertCount, AlertCountWidget } from "../AlertCount"
import { CurrentPriceWidget } from "../../shared/CurrentPriceWidget/CurrentPriceWidget";
import "./index.scss";

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

type AlertFormMode = 'DEFAULT' | 'EDIT';

export interface FormState {
    id?: number,
    channel: string,
    network: string,
    pair: string,
    price_target: number,
    trigger_once: boolean,
    condition: string,
}
const initialValues: FormState = { channel: '', network: '', pair: '', price_target: 0, trigger_once: true, condition: '' };

export const AlertForm = ({mode = 'DEFAULT', editAlertData}: {mode?: AlertFormMode, editAlertData?: FormState}) => {
    const [typeOfNotification, setTypeOfNotification] = useState<string[]>(notification_channel);
    const [typeOfNetwork, setTypeOfNetwork] = useState<string[]>([]);
    const [typeOfPair, setTypeOfPair] = useState<string[] | any[]>([]);
    const [modalMsg, setModalMsg] = useState<IModalHeader>({ primary: '', secondary: '' });
    const [opened, setOpened] = useState<boolean>(false);
    const priceFeedNetwork = useAppSelector((state) => state.priceFeedSlice);

    const [createAlert, { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate, isSuccess: isSuccessCreate }] = useCreateAlertMutation();
    const [modifyAlert, { isLoading: isLoadingModify, isError: isErrorModify, error: errorModify, isSuccess: isSuccessModify }] = useModifyAlertMutation();
    
    const form = useForm({
        initialValues: mode === 'DEFAULT' ? initialValues : editAlertData
    })

    useEffect(() => {
        if(mode === 'EDIT') {
            form.setValues({...editAlertData, price_target: Number(editAlertData?.price_target)})
        }
    }, [])

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
        if(isSuccessCreate || isSuccessModify) {
            setOpened(!opened);
            setModalMsg({
                primary: mode === 'DEFAULT' ? 'Alert Created' : 'Alert Modified',
                secondary: 'Success! Your alert has been saved.'
            })
        }
    }, [isSuccessCreate, isSuccessModify]);

    useEffect(() => {
        if(isErrorCreate || isErrorModify) {
            setModalMsg({
                primary: mode === 'DEFAULT' ? 'Unable to create alert' : 'Failed to modify your alert',
                secondary: 'Please check the missing fields.'
            });
            setOpened(!opened);
        };
    }, [isErrorCreate, isErrorModify]);

    
    const onSubmitAlert = (isEdit?: boolean) => {
        const watch = `${form.values.network}-${form.values.pair}`;
        const condition = mapCondition(form.values.condition);
        const payload = {
            watch,
            price_target: form.values.price_target,
            trigger_once: form.values.trigger_once,
            condition,
            channel: form.values.channel
        }
        if(!isEdit) {
            createAlert({...payload});
        } else {
            modifyAlert({id: editAlertData?.id, ...payload})
        }
    };
    console.log(form.values.trigger_once)
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
                <div className="responsive-input">
                    <Text>Send me an</Text>
                    <Select
                        defaultValue={form.values.channel}
                        {...form.getInputProps('channel')}
                        className="w-[153px]"
                        radius={'xl'}
                        data={typeOfNotification}
                        placeholder='Notification'
                    />
                </div>
                <div className="responsive-input">
                    <Text>as soon as</Text>
                    <Select
                        {...form.getInputProps('pair')}
                        className="w-[124px]"
                        radius={'xl'}
                        data={typeOfPair}
                        placeholder='Pair'
                    />
                </div>
                <div className="responsive-input">
                <Text>goes</Text>
                <Select
                    {...form.getInputProps('condition')}
                    className="w-[134px]"
                    radius={'xl'}
                    data={condition}
                    placeholder='Condition'
                />
                </div>
                <div className="responsive-input">
                <Text>the price of</Text>
                <NumberInput
                    {...form.getInputProps('price_target')}
                    defaultValue={10.00}
                    className="w-[201px]"
                    radius={'xl'}
                    precision={2}
                />
                </div>
                <Text>on chain.</Text>
                
            </div>
            {mode === 'DEFAULT' && <CurrentPriceWidget/>}
            <div className="inlined-wrapped text-base text-white gap-2">
                <Checkbox checked={form.values.trigger_once} {...form.getInputProps('trigger_once')}/>
                <Text>Disable this alert after it triggers once.</Text>
            </div>
            <Button 
                onClick={() => onSubmitAlert(mode === 'DEFAULT' ? false : true)}
                radius={'xl'}
                className='dfa-btn-gradient'>
                {mode === 'DEFAULT' ? <>Set Alert</> : <>Save Alert</>}
            </Button>
            {mode === 'DEFAULT' &&
                <>
                    <AlertCountWidget/>
                </>
            }
        </DFAGrid>
    )
}