import { Button, Progress, Text } from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/redux";
import { useGetAlertQuery, useLazyGetAlertQuery } from "../../../shared/redux/api/price-alert.api";
import { initUserPriceAlert } from "../../../shared/redux/features/price-alert.slice";

type layout = 'variant_1' | 'variant_2';

export const AlertCount = ({type = 'variant_1'}: {type?: layout}) => {

    const [trigger] = useLazyGetAlertQuery();
    const dispatch = useAppDispatch();
    // console.log('count comp', data)
    const [alertCountNum, setAlertCountNum] = useState(0);
    const [alertCount, setAlertCount] = useState(0);
    const limit = 3;
    useEffect(() => {
        async function fn() {
            const { data, isLoading, isError, error } = await trigger();
            if(!isLoading && data && data.length > 0) {
                const usedCount = data.length;
                const inPercent = (usedCount / limit) * 100;
                dispatch(initUserPriceAlert(data));
                setAlertCountNum(usedCount);
                setAlertCount(Number(inPercent.toFixed(2)));
            }
        }
        fn()
    }, [trigger])

    return (
        <div className="flex flex-col items-center text-center gap-[18px]">
            <Progress className="w-full dfa-gradient-progress" value={alertCount}/>
            {type === 'variant_1' &&
                <>
                    <Text className="text-white">Using <span className="dfa-text-gradient">{alertCountNum}</span> out of <span className="dfa-text-gradient">3</span> alerts</Text>
                    <Button radius={'xl'} className="dfa-btn-gradient">Upgrade</Button>
                </>
            }
            {type === 'variant_2' &&
                <div className="inlined-component-centered gap-3">
                    <Text className="text-white text-sm">You're now using <span className="dfa-text-gradient">{alertCountNum}</span> out of <span className="dfa-text-gradient">3</span> alerts</Text>
                    <Button radius={'xl'} className="dfa-btn-gradient-0 py-[5px] text-base">Unlock More</Button>
                </div>
            }

        </div>
    )
}

export const AlertCountWidget = () => {
    const navigate = useNavigate();
    const [alertCount, setAlertCount] = useState(0);

    const priceAlerts = useAppSelector((state) => state.priceAlertSlice);

    useEffect(() => {
        if(priceAlerts && priceAlerts.length > 0) {
            setAlertCount(priceAlerts.length);
        }
    }, [priceAlerts]);

    return (
        <Text className="text-dfa-grey text-center text-base">
            You have 
            <span onClick={() => navigate('/alert')} className="cursor-pointer dfa-text-gradient">
                &nbsp;{alertCount}
            </span> active price alerts.
        </Text>
    )
}