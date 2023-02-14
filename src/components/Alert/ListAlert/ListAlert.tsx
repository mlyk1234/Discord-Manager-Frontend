import { Switch, Text } from "@mantine/core"
import dayjs from "dayjs";
import { IListAlert } from ".."
import { ReactComponent as TrashIcon } from "../../../asset/common/trash.icon.svg";
import { ReactComponent as EditIcon } from "../../../asset/common/edit.icon.svg";
import "./index.scss";

type Lookup = 'active' | 'history';

export const ListAlert = ({data, lookup = 'active'}: {data?: IListAlert[], lookup?: Lookup}) => {
    return (
        <div className="flex flex-col justify-between items-center w-full list-alert">
            {data?.map((item, index) =>
                <div key={index} className="list-container flex flex-row justify-between items-center w-full">
                    <Text className="list-text">Send an <span>{item.channel}</span> as soon as <span>{item.watch}</span> goes <span>{item.condition}</span> the price of <span>{item.price_target} USD</span> on chain.</Text>
                    <div className="flex flex-row gap-5">
                        {lookup === 'active' ?
                        <>
                            <Switch/>
                            <TrashIcon/>
                            <EditIcon/>
                        </> :
                        <>
                            <Text className="text-white">{dayjs(item.createdDate.toString()).format('DD/MM/YYYY hh:mm A')}</Text>
                        </>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}