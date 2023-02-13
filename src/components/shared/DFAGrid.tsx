import { Center, Container, Text } from "@mantine/core"

interface IDFAGrid {
    primary: string,
    secondary: string | JSX.Element
}

interface ISizingOptions {
    width: string,
    height?: string
}

export const DFAGrid = ({str, children}: {str?: IDFAGrid, children: JSX.Element | JSX.Element[]}) => {

    return (
        <Center className="h-full">
            <Container p={0} className="w-[540px] flex flex-col gap-8">
                <div className="flex flex-col gap-1 text-center">
                    <Text className="text-3xl text-white">{str?.primary}</Text>
                    <Text className="text-base text-dfa-grey">{str?.secondary}</Text>
                </div>
                {children}
            </Container>
            {/* {children} */}
        </Center>
    )
}