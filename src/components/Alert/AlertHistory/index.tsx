import { Container } from "@mantine/core"
import { useEffect, useState } from "react";
import { IListAlert } from "..";
import { useAppSelector } from "../../../shared/redux";
import { InitialState } from "../Initial";
import { ListAlert } from "../ListAlert/ListAlert";


const datalist: IListAlert[] = [];

const conditionMapper = (type: string) => {
    if(type === 'gte') return 'above';
    else return 'below';
}

export const AlertHistory = () => {
    const [data, setData] = useState<IListAlert[]>(datalist);
    const priceAlerts = useAppSelector((state) => state.priceAlertSlice);
    useEffect(() => {
        if(priceAlerts && priceAlerts.length > 0) {
            const res: IListAlert[] = [];
            priceAlerts.forEach((item, index) => {
                const split = item.watch.split('-');
                res.push({
                    id: index,
                    watch: split[0],
                    condition: conditionMapper(item.condition),
                    price_target: item.price_target,
                    channel: item.channel,
                    enabled: item.enabled,
                    createdDate: item.createdDate
                })
            })
            setData(res);
        }
    }, [priceAlerts])
    return (
        <>
            {data && data.length > 0 ?
                <ListAlert lookup="history" data={data}/> :
                <InitialState/>
            }
        </>
    )
}