import { Button, Switch, Text } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./index.scss";

import { ListAlert } from "../ListAlert/ListAlert";
import { IListAlert } from "..";
import { InitialState } from "../Initial";
// mantine-Tabs-tab


const datalist: IListAlert[] = [{
    id: 1,
    channel: 'Slack',
    watch: 'BTC',
    condition: 'lte',
    price_target: (23000).toFixed(2),
    currency: 'USD'
}];

export const ActiveAlert = () => {
    const [data, setData] = useState<IListAlert[]>(datalist);

    const navigate = useNavigate();
    return (
        <>
            {data && data.length > 0 ?
                <ListAlert data={data}/> :
                <InitialState/>
            }
        </>
    )
}