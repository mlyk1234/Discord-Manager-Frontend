import { Login } from "./login";
import { Register } from "./register";
import style from "./index.module.scss";
import { Verification } from "./register/verification";

const Auth = ({children}: {children: JSX.Element}) => {
    return (
        <>
            {children}
        </>
    )
}

Auth.Login = Login;
Auth.Register = Register;
Auth.Verify = Verification;

export default Auth;