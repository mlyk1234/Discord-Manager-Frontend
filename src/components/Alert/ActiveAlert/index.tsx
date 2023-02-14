import { Button, Switch, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./index.scss";

import { ListAlert } from "../ListAlert/ListAlert";
import { IListAlert } from "..";
import { InitialState } from "../Initial";
import { useAppSelector } from "../../../shared/redux";
// mantine-Tabs-tab


const datalist: IListAlert[] = [{
    id: 1,
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

export const ActiveAlert = () => {
    const [data, setData] = useState<IListAlert[]>(datalist);
    const priceAlerts = useAppSelector((state) => state.priceAlertSlice);

    useEffect(() => {
        if(priceAlerts && priceAlerts.length > 0) {
            const res: IListAlert[] = [];
            const filtered = priceAlerts.filter((item) => item.status === 'S');
            filtered.forEach((item, index) => {
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
    }, [priceAlerts]);
    
    return (
        <>
            {data && data.length > 0 ?
                <ListAlert data={data}/> :
                <InitialState/>
            }
        </>
    )
}