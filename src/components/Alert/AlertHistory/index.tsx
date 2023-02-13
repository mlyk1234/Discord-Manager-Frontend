import { Container } from "@mantine/core"
import { useState } from "react";
import { IListAlert } from "..";
import { InitialState } from "../Initial";
import { ListAlert } from "../ListAlert/ListAlert";


const datalist: IListAlert[] = [{
    id: 1,
    channel: 'Discord',
    watch: 'ETH',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD'
},
{
    id: 2,
    channel: 'Slack',
    watch: 'BTC',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD'
},
{
    id: 3,
    channel: 'Slack',
    watch: 'BTC',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD'
}];


export const AlertHistory = () => {
    const [data, setData] = useState<IListAlert[]>(datalist);

    return (
        <>
            {data && data.length > 0 ?
                <ListAlert lookup="history" data={data}/> :
                <InitialState/>
            }
        </>
    )
}