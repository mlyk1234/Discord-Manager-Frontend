import { Button, Center, Container, Switch, Text } from "@mantine/core"
import dayjs from "dayjs";
import { IListAlert } from ".."
import { ReactComponent as TrashIcon } from "../../../asset/common/trash.icon.svg";
import { ReactComponent as EditIcon } from "../../../asset/common/edit.icon.svg";
import "./index.scss";
import { DFAModal, IModalHeader } from "../../Modal";
import { useEffect, useState } from "react";
import { useDeleteAlertMutation, useLazyGetAlertQuery, useModifyAlertMutation } from "../../../shared/redux/api/price-alert.api";
import { useAppDispatch } from "../../../shared/redux";
import { AlertForm, FormState } from "../AlertForm";

type Lookup = 'active' | 'history';

export const ListAlert = ({data, lookup = 'active'}: {data?: IListAlert[], lookup?: Lookup}) => {
    const dispatch = useAppDispatch();
    const [initData, setInitData] = useState<IListAlert[]>([]);
    const [modalMsg, setModalMsg] = useState<IModalHeader>({ primary: 'Are you sure to delete?', secondary: 'This action is not reversible.' });
    const [injectElement, setInjectElement] = useState<JSX.Element>(<></>)
    const [opened, setOpened] = useState<boolean>(false);
    const [select, setSelect] = useState<number>(0);
    const [deleteAlert, {isSuccess, isError, isLoading}] = useDeleteAlertMutation();
    const [modifyAlert, {isSuccess: isSuccessModifyStatus}] = useModifyAlertMutation();
    const [trigger, {isLoading: isLoadingGetList}] = useLazyGetAlertQuery()

    const onChangeAlertStatus = (id: number) => {
        const find = data?.find((item) => item.id === id);
        const payloadToEdit = {
            ...find,
            enabled: !find?.enabled
        }
        console.log(payloadToEdit);
        modifyAlert({
            ...payloadToEdit
        })
    }

    const onDeleteAlert = (id: number) => {
        setModalMsg({ primary: 'Are you sure to delete?', secondary: 'This action is not reversible.'});
        setInjectElement(<Button onClick={() => proceedDelete()} radius={'xl'} className='mt-[-16px] border border-dfa-grey hover:bg-red-700 w-full'>Proceed</Button>)
        setOpened(!opened);
        setSelect(id);
    }
    const proceedDelete = () => {
        deleteAlert({id: select});
    }

    const onEditAlert = (id: number) => {
        const findById = initData.find((item) => item.id === id);
        console.log(findById)
        if(!findById) return;
        setModalMsg({ primary: 'Edit selected alert.', secondary: 'This action is not reversible.'});
        const editPayload: FormState = {
            id: findById.id,
            channel: findById.channel,
            network: findById.watch.split('-')[0],
            pair: findById.watch.split('-')[1],
            price_target: findById.price_target,
            trigger_once: findById.trigger_once,
            condition: findById.condition
        }
        setInjectElement(<AlertForm mode="EDIT" editAlertData={{...editPayload}}/>)
        setOpened(!opened);
        setSelect(id);
    }

    useEffect(() => {
        if(isSuccess) {
            setOpened(false);
            refresh();
        }
        async function refresh() {
            await trigger();
        }
    }, [isSuccess, trigger]);

    useEffect(() => {
        if(data && data.length > 0) {
            setInitData(data);
        }
    }, [data])

    useEffect(() => {
        if(isSuccessModifyStatus) {
            refresh();
        }
        async function refresh() {
            await trigger();
        }
    }, [isSuccessModifyStatus])
    
    return (
        <div className="flex flex-col justify-between items-center w-full list-alert">
            <DFAModal variant='variant_2' opened={opened} setOpened={setOpened} 
                str={{primary: modalMsg.primary, secondary: modalMsg.secondary}}
            >
                <Center>
                    {injectElement}
                </Center>
            </DFAModal>
            {initData?.map((item, index) =>
                <div key={index} className="list-container">
                    <Text className="text-left list-text">Send an <span>{item.channel}</span> as soon as <span>{item.watch.split('-')[1]}</span> goes <span>{item.condition}</span> the price of <span>{item.price_target} USD</span> on <span>{item.watch.split('-')[0]}</span> chain.</Text>
                    <div className="flex flex-row gap-5">
                        {lookup === 'active' ?
                        <>
                            <Switch onClick={() => onChangeAlertStatus(item.id)} checked={item.enabled} styles={{ input: { cursor: "pointer" } }}/>
                            <TrashIcon className="cursor-pointer" onClick={() => onDeleteAlert(item.id)}/>
                            <EditIcon className="cursor-pointer" onClick={() => onEditAlert(item.id)}/>
                        </> :
                        <>
                            <Text className="text-white">{dayjs(item.createdDate.toString()).format('DD/MM/YYYY hh:mm A')}</Text>
                        </>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}