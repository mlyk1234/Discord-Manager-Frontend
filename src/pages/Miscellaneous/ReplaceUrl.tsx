import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

export const ReplaceUrl = () => {

    let [searchParams, setSearchParams] = useSearchParams('url');
    const search = searchParams.get('url');
    useEffect(() => {
        if(search) {
            localStorage.setItem('backendUrl', search);
        }
    }, [])

    return (
        <div></div>
    )
}