import { Button, Container } from "@mantine/core";
import AppRoute from "../../router";
import "./index.scss";

export default function Viewbase() {

    return (
        <div className="dfa-view-base h-[100vh] w-full bg-dfa">
                <AppRoute/>
        </div>
    )
}