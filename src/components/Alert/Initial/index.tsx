import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const InitialState = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Text className="text-white text-base">You have no active alerts.</Text>
            <Button onClick={() => navigate('/')} radius={'xl'} className="dfa-btn-gradient">Set Alert Now</Button>
        </div>
    )
}