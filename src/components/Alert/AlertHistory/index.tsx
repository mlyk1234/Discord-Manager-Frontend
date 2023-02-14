import { Container } from "@mantine/core"
import { useEffect, useState } from "react";
import { IListAlert } from "..";
import { useAppSelector } from "../../../shared/redux";
import { InitialState } from "../Initial";
import { ListAlert } from "../ListAlert/ListAlert";


const datalist: IListAlert[] = [{
    id: 1,
    channel: 'Discord',
    watch: 'ETH',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD',
    enabled: false,
    createdDate: new Date()
},
{
    id: 2,
    channel: 'Slack',
    watch: 'BTC',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD',
    enabled: false,
    createdDate: new Date()
},
{
    id: 3,
    channel: 'Slack',
    watch: 'BTC',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD',
    enabled: false,
    createdDate: new Date()
}];

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