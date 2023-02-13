import { Button, Progress, Text } from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import { useGetAlertQuery, useLazyGetAlertQuery } from "../../../shared/redux/api/price-alert.api";

type layout = 'variant_1' | 'variant_2';

export const AlertCount = ({type = 'variant_1'}: {type?: layout}) => {

    const [trigger, { data, isLoading, error }] = useLazyGetAlertQuery();

    // console.log('count comp', data)
    const [alertCount, setAlertCount] = useState(0);
    const limit = 3;
    useEffect(() => {
        async function fn() {
            const { data, isLoading, isError, error } = await trigger();
            console.log('naaa', data);
            if(!isLoading && data && data.length > 0) {
                const usedCount = data.length;
                const inPercent = (usedCount / limit) * 100;
                setAlertCount(Number(inPercent.toFixed(2)));
            }
        }
        fn()
    }, [trigger])
    // useEffect(() => {
    //     if(!isLoading && data) {
    //         const usedCount = data.length;
    //         const inPercent = (usedCount / limit) * 100;
    //         setAlertCount(Number(inPercent.toFixed(2)));
    //     }
    // }, [data, isLoading]);

    return (
        <div className="flex flex-col items-center text-center gap-[18px]">
            <Progress className="w-full dfa-gradient-progress" value={alertCount}/>
            {type === 'variant_1' &&
                <>
                    <Text className="text-white">Using <span className="dfa-text-gradient">1</span> out of <span className="dfa-text-gradient">3</span> alerts</Text>
                    <Button radius={'xl'} className="dfa-btn-gradient">Upgrade</Button>
                </>
            }
            {type === 'variant_2' &&
                <div className="inlined-component-centered gap-3">
                    <Text className="text-white text-sm">You're now using <span className="dfa-text-gradient">1</span> out of <span className="dfa-text-gradient">3</span> alerts</Text>
                    <Button radius={'xl'} className="dfa-btn-gradient-0 py-[5px] text-base">Unlock More</Button>
                </div>
            }

        </div>
    )
}