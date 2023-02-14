import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "../components/auth";
import NotFound404 from "../pages/404";
import Dashboard from "../pages/Dashboard/";
import { Unauthorized } from "../pages/Miscellaneous/Unauthorized";
import { MyAlert } from "../pages/MyAlert";
import { Settings } from "../pages/Settings";

interface ISourceMap {
    path: string,
    name: string,
    title: string,
    component: JSX.Element,
    exact?: boolean,
    children?: any[],
    requireAuth?: boolean,
    access?: string
}

export const _SourceMapper: ISourceMap[] = [
    {
        path: "/",
        name: "Home",
        title: "Home",
        requireAuth: false,
        component: <Auth><Auth.Login/></Auth>,
        access: 'public'
    },
    {
        path: "/register",
        name: "Register",
        title: "Register",
        requireAuth: false,
        component: <Auth><Auth.Register/></Auth>,
        access: 'public',
    },
    {
        path: "/verify",
        name: "Verify Email",
        title: "Verify Email",
        requireAuth: false,
        component: <Auth><Auth.Verify/></Auth>,
        access: 'public',
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        title: "Dashboard",
        requireAuth: true,
        component: <Dashboard/>,
        access: 'protected'
    },
    {
        path: "/alert",
        name: "Alert",
        title: "Alert",
        requireAuth: true,
        component: <MyAlert/>,
        access: 'protected'
    },
    {
        path: "/settings",
        name: "Settings",
        title: "Settings",
        requireAuth: true,
        component: <Settings/>,
        access: 'protected'
    },
    {
        path: "/about",
        name: "About Page",
        title: "About",
        requireAuth: false,
        component: <>Nothing to see</>,
        access: 'public'
    }
]

export const DeFiAPIRoute = ({authenticated}: {authenticated: boolean}) => {
    const location = useLocation();

    const find: JSX.Element[] = _SourceMapper.map((key, index) => {
        if(key.requireAuth === authenticated) {
            return <Route key={index} path={key.path} element={key.component}></Route>;
        } else {
            if(key.access === 'protected') {
                return <Route key={index} path={key.path} element={<Unauthorized/>}></Route>
            } else {
                return <Route key={index} path={key.path} element={<Navigate to="/dashboard" state={{ from: location }} replace />}></Route>
            }
        }
    });

    return (
        <Routes>
            {find && find.length > 0 &&
                <>
                    {find.map((route) => route)}
                </>
            }
            <Route path="*" element={<NotFound404/>}></Route>
        </Routes>
    )
}