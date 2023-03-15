import { Login } from "./login";
import style from "./index.module.scss";

const Auth = ({children}: {children: JSX.Element}) => {
    return (
        <>
            {children}
        </>
    )
}

Auth.Login = Login;

export default Auth;