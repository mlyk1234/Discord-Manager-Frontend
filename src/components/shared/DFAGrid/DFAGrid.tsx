import { Center, Container, Text } from "@mantine/core"
import "./index.scss";

interface IDFAGrid {
    primary: string,
    secondary: string | JSX.Element
}

interface ISizingOptions {
    width: string,
    height?: string
}

export const DFAGrid = ({str, children}: {str?: IDFAGrid, children: JSX.Element | JSX.Element[] | boolean | null | false | any}) => {

    return (
            <Container p={0} className="DFA-Grid-root">
                <div className="flex flex-col gap-1 items-center">
                    <Text className="text-3xl text-white">{str?.primary}</Text>
                    <Text className="text-base text-dfa-grey">{str?.secondary}</Text>
                </div>
                {children}
            </Container>
    )
}