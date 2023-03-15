import { Button, Center, Container, Text } from "@mantine/core"
import { useState } from "react";
import { Fade, Slide,  } from "react-awesome-reveal";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";
import { ReactComponent as MainIcon } from "../../../asset/common/page.icon.svg"
import "./framer.scss";
import Navigator from "../Navigator";

interface IFrameText {
    primary: string,
    secondary: string | JSX.Element
}

interface ISizingOptions {
    width: string,
    height?: string
}
const defaultSizingOptions: ISizingOptions = {
    width: '600px'
}
type SizingType = 'Regular' | 'Small';

export const Frame = ({str, children, sizingOptions = 'Regular', isLoading = false}: {str?: IFrameText, children: JSX.Element | JSX.Element[], sizingOptions?: SizingType, isLoading?: boolean}) => {

    return (
            <div className={`${sizingOptions === 'Regular' ? 'framer-regular' : 'framer-small'}`}>
                <Navigator/>
                {children}
                {isLoading &&
                    <div className="backdrop-blur-[1.5px] bg-white/2 absolute w-full h-full items-center justify-center flex flex-col gap-2">
                        <Text className="text-white font-semibold">Logging in</Text>
                        <CirclesToRhombusesSpinner/>
                    </div>
                }
            </div>
    )
}