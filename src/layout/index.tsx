import { useEffect, useState, useTransition } from "react";
import { Generic } from "./generic";
import { motion } from "framer-motion";
import "./index.scss";
import { Refresh } from "../components/shared/Refresh";

export default function Layout({ header, body, footer }: { header?: JSX.Element, body?: JSX.Element, footer?: JSX.Element}): JSX.Element {
    const [layout, setLayout] = useState<JSX.Element>(<></>);
    const [isPending, startTransition] = useTransition();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        startTransition(() => {

            setLayout(
                Generic({children: {
                    header: header,
                    body: body,
                    footer: footer
                }})
            )
        })
    }, []);
    return (
        <>{layout}</>
        // <>
        // {!isLoaded &&
        //     <Refresh setIsLoaded={setIsLoaded}/>
        // }
        // {isLoaded &&
        //     <>{layout}</>
        // }
        // </>
    )
}