import { Button, Center, Container, Text } from "@mantine/core"
import { useState } from "react";
import { Fade, Slide,  } from "react-awesome-reveal";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";
import { ReactComponent as MainIcon } from "../../../asset/common/page.icon.svg"
import "./framer.scss";

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
export const Frame = ({str, children, sizingOptions = 'Regular', isLoading = false}: {str?: IFrameText, children: JSX.Element, sizingOptions?: SizingType, isLoading?: boolean}) => {
    
    return (
            <Fade className={`${sizingOptions === 'Regular' ? 'framer-regular' : 'framer-small'}`}>
                <div className="grids">
                    <div className="col icon_placeholder"><MainIcon/></div>
                    <div className="col auth_placeholder">
                        <Text className="font-medium text-2xl text-white">Hello.</Text>
                        {children}
                    </div>
                </div>
                {isLoading &&
                    <div className="backdrop-blur-[1.5px] bg-white/2 absolute w-full h-full items-center justify-center flex flex-col gap-2">
                        <Text className="text-white font-semibold">Logging in</Text>
                        <CirclesToRhombusesSpinner/>
                    </div>
                }
            </Fade>
    )
}