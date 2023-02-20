import { Button, Switch, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./index.scss";

import { ListAlert } from "../ListAlert/ListAlert";
import { IListAlert } from "..";
import { InitialState } from "../Initial";
import { useAppSelector } from "../../../shared/redux";
// mantine-Tabs-tab


const datalist: IListAlert[] = [];

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
            const filtered = priceAlerts.filter((item) => item.status === 'P');
            filtered.forEach((item, index) => {
                const split = item.watch.split('-');
                res.push({
                    id: item.id,
                    watch: item.watch,
                    condition: conditionMapper(item.condition),
                    price_target: item.price_target,
                    trigger_once: item.trigger_once,
                    channel: item.channel,
                    enabled: item.enabled,
                    createdDate: item.createdDate
                })
            })
            setData(res);
        } else {
            setData([])
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