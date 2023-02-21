import { Button, Center, Container, Text } from "@mantine/core"
import { useState } from "react";
import { Fade, Slide,  } from "react-awesome-reveal";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";
import { ReactComponent as ReactLogo } from "../../asset/DFA/bell.icon.svg";

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
type SlideDirection = "down" | "left" | "right" | "up";
export const Frame = ({str, children, sizingOptions = 'Regular', isLoading = false}: {str?: IFrameText, children: JSX.Element, sizingOptions?: SizingType, isLoading?: boolean}) => {
    
    return (
            <Fade>
                <Container p={0} className="h-full w-full flex justify-center">
                    <Center className="bg-red-bak-500 relative">
                        <Container className={`bg-framer ${sizingOptions === 'Regular' ? 'framer-regular' : 'framer-small'}`}>
                            <Container p={0} className="flex flex-col items-center">
                                <ReactLogo className="mb-6"/>
                                <Container className="text-center flex items-center flex-col gap-3">
                                    <div className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F49634] to-[#F4D37F]">{str?.primary}</div>
                                    <Text className="text-white text-base text-center">{str?.secondary}</Text>
                                </Container>
                                {children}
                            </Container>
                        </Container>
                        {isLoading &&
                            <div className="backdrop-blur-[1.5px] bg-white/2 absolute w-full h-full items-center justify-center flex flex-col gap-2">
                                <Text className="text-white font-semibold">Logging in</Text>
                                <CirclesToRhombusesSpinner/>
                            </div>
                        }
                    </Center>
                </Container>
            </Fade>
    )
}