import { useEffect, useState } from "react";
import { Generic } from "./generic";

export default function Layout({ header, body, footer }: { header?: JSX.Element, body?: JSX.Element, footer?: JSX.Element}): JSX.Element {
    const [layout, setLayout] = useState<JSX.Element>(<></>);

    useEffect(() => {
        setLayout(
            Generic({children: {
                header: header,
                body: body,
                footer: footer
            }})
        )
        console.log('Active Layout: [Generic]')
    }, [header, body, footer])

    return layout;
}