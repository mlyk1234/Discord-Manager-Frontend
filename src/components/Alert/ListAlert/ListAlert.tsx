import { Button, Center, Container, Switch, Text } from "@mantine/core"
import dayjs from "dayjs";
import { IListAlert } from ".."
import { ReactComponent as TrashIcon } from "../../../asset/common/trash.icon.svg";
import { ReactComponent as EditIcon } from "../../../asset/common/edit.icon.svg";
import "./index.scss";
import { DFAModal, IModalHeader } from "../../Modal";
import { useEffect, useState } from "react";
import { useDeleteAlertMutation, useLazyGetAlertQuery } from "../../../shared/redux/api/price-alert.api";
import { useAppDispatch } from "../../../shared/redux";

type Lookup = 'active' | 'history';

export const ListAlert = ({data, lookup = 'active'}: {data?: IListAlert[], lookup?: Lookup}) => {
    const dispatch = useAppDispatch();
    const [initData, setInitData] = useState<IListAlert[]>([]);
    const [modalMsg, setModalMsg] = useState<IModalHeader>({ primary: 'Are you sure to delete?', secondary: 'This action is not reversible.' });
    const [opened, setOpened] = useState<boolean>(false);
    const [select, setSelect] = useState<number>(0);
    const [deleteAlert, {isSuccess, isError, isLoading}] = useDeleteAlertMutation();
    const [trigger] = useLazyGetAlertQuery()
    const onDeleteAlert = (id: number) => {
        setOpened(!opened);
        setSelect(id);
    }
    const proceedDelete = () => {
        deleteAlert({id: select});
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
    
    return (
        <div className="flex flex-col justify-between items-center w-full list-alert">
            <DFAModal variant='variant_2' opened={opened} setOpened={setOpened} 
                str={{primary: modalMsg.primary, secondary: modalMsg.secondary}}
            >
                <Center>
                    <Button onClick={() => proceedDelete()} radius={'xl'} className='mt-[-16px] border border-dfa-grey hover:bg-red-700 w-full'>Proceed</Button>
                </Center>
            </DFAModal>
            {initData?.map((item, index) =>
                <div key={index} className="gap-5 list-container flex flex-row justify-between items-center w-full">
                    <Text className="text-left list-text">Send an <span>{item.channel}</span> as soon as <span>{item.watch}</span> goes <span>{item.condition}</span> the price of <span>{item.price_target} USD</span> on chain.</Text>
                    <div className="flex flex-row gap-5">
                        {lookup === 'active' ?
                        <>
                            <Switch checked={item.enabled}/>
                            <TrashIcon className="cursor-pointer" onClick={() => onDeleteAlert(item.id)}/>
                            <EditIcon/>
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