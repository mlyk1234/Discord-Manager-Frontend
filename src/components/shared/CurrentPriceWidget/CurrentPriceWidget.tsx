import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ReactComponent as LightningIcon } from "../../../asset/DFA/lightning.icon.svg";
import { useGetPrice } from "../../../shared/hooks/global/utility-hooks";
import { thousandSeperator } from "../../../shared/utils/general.utils";
import RefreshIcon from "../../../asset/common/refresh.icon.png";
import "./index.scss";

export const CurrentPriceWidget = () => {
    const [rotate, setRotate] = useState<boolean>(false);
    const [priceOf, setPriceOf] = useState<number>(0)
    const { price, refetch, isLoaded, setIsLoaded } = useGetPrice();

    useEffect(() => {
        if(price) {
            setPriceOf(price);
        }
    }, [price]);

    const refetchHandler = async () => {
        setIsLoaded(true)
        setRotate(true);
        await refetch();
    }

    return (
        <>
            <div className="inlined-wrapped text-dfa-grey text-base font-medium">
                <LightningIcon className="mr-2"/>
                <Text>The price of <span className="dfa-text-gradient">BTC</span> is currently</Text>&nbsp;
                <Text className="dfa-text-gradient">{thousandSeperator(priceOf)} USD</Text>.
                <div className="refresh-icon">
                    <img onClick={() => refetchHandler()} style={isLoaded ? {animation: 'rotation 3s infinite linear', animationDuration: '0.5s', cursor: 'not-allowed'} : {animation: 'unset'}} src={require('../../../asset/common/refresh.icon.png')}/>
                </div>
            </div>
        </>
    )
}