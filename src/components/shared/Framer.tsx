import { Center, Container, Text } from "@mantine/core"
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

export const Frame = ({str, children, sizingOptions = 'Regular'}: {str?: IFrameText, children: JSX.Element, sizingOptions?: SizingType}) => {

    return <Container className="h-full w-full flex justify-center">
        <Center className="bg-red-bak-500">
            <Container className={`bg-framer ${sizingOptions === 'Regular' ? 'framer-regular' : 'framer-small'}`}>
                <Container p={0} className="flex flex-col items-center">
                    <ReactLogo className="mb-6"/>
                    <Container className="flex items-center flex-col gap-3">
                        <Text className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F49634] to-[#F4D37F]">{str?.primary}</Text>
                        <Text className="text-white text-base text-center">{str?.secondary}</Text>
                    </Container>
                    {children}
                </Container>
            </Container>
        </Center>
    </Container>
}