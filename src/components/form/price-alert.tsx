import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../shared/redux";
import { useGetAllNetworkQuery } from "../../shared/redux/api/price-feed.api";

interface ISupportedPair {
    pair: string,
    address: string,
    decimal: string
}
interface INetworkChain {
    id: number,
    network: string,
    supported_pair: ISupportedPair[],
    status: string
}

export default function PriceAlertForm() {
    const initialState: INetworkChain[] = []; 
    const [networkChain, setNetworkChain] = useState<INetworkChain>();
    const [pair, setPair] = useState<ISupportedPair[]>();
    const [selectedPair, SetSelectedPair] = useState();
    const [price, setPrice] = useState<Number>();
    const [condition, setCondition] = useState();
    const user = useAppSelector((state) => state.userSlice.user);
    const { isLoading, isError, error, isSuccess, data } = useGetAllNetworkQuery();
    console.log('hello', data)

    const onNetworkSelect = (event: any) => {
        console.log('key', event.target.value)
        if(data) {
            const find = data.find((item) => item.network === event.target.value);
            if(find)
            setNetworkChain(find);
        }
    }
    const onPairSelect = (event: any) => {
        console.log('selectedpair', event.target.value);
        SetSelectedPair(event.target.value);
    }

    const priceInput = (event: any) => {
        console.log('priceinput', event.target.value);
        setPrice(event.target.value);
        
    }
    const onSelectCondition = (event: any) => {
        console.log('condition', event.target.value);
        setCondition(event.target.value);
    }

    const onSubmitAlert = async () => {
        const responseBody = {
            watch: `${networkChain?.network}-${selectedPair}`,
            price_target: Number(price),
            condition: condition
        }
        console.log(responseBody);

        try {
            const result = await axios.post('http://localhost:3002/api/v1/price-alert/create-alert', responseBody);
            console.log('result', result)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <>
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmitAlert();
                }}>
                <div>
                    Select Network Chain
                    <select onClick={(v) => onNetworkSelect(v)}>
                        {data && data.length > 0 &&
                            <>
                            {
                                data.map((key, index) => 
                                    <option key={key.id} value={key.network}>{key.network}</option>
                                )
                            }
                            </>
                        }
                        {isLoading &&
                            <option>Loading</option>
                        }
                    </select>
                </div>
                <div>
                    Select Network Pair
                    <select onClick={(v) => onPairSelect(v)}>
                        {networkChain && networkChain.supported_pair.length > 0 &&
                            <>
                            {
                                networkChain.supported_pair.map((key, index) => 
                                    <option key={key.pair} value={key.pair}>{key.pair}</option>
                                )
                            }
                            </>
                        }
                        {isLoading &&
                            <option>Loading</option>
                        }
                    </select>
                </div>
                <div>
                    Enter Price Target
                    <div>
                        <input onChange={(v) => priceInput(v)} type='number'/>
                    </div>
                </div>
                <div>
                    Condition
                    <select onClick={(v) => onSelectCondition(v)}>
                        <option value={'gte'}>If price goes above</option>
                        <option value={'lte'}>If price goes below</option>
                    </select>
                </div>
                <button type="submit">Submit me</button>
            </form>
        </div>
        </>
    )
}