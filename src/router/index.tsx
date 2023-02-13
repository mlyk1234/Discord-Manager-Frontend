import { useEffect } from "react";
import { useAppSelector } from "../shared/redux";
import { DeFiAPIRoute, SourceMap, SourceMapV2 } from "./sourceMap";

const AppRoute = () => {
    const session = useAppSelector((state) => state.sessionSlice.session_status);
    // const location = useLocation();
    // console.log(location)
    // useEffect(())
    const authenticated = true;
    return (
        <DeFiAPIRoute authenticated={session === 'active' ? true : false}/>

    )
}

export default AppRoute;