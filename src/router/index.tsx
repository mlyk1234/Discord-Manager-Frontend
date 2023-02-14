import { useAppSelector } from "../shared/redux";
import { DeFiAPIRoute } from "./sourceMap";

const AppRoute = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);

    return (
        <DeFiAPIRoute authenticated={session === 'active' ? true : false}/>
    )
}

export default AppRoute;