import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "../components/auth";
import NotFound404 from "../pages/404";
import Dashboard from "../pages/Dashboard/";
import { Unauthorized } from "../pages/Miscellaneous/Unauthorized";
import Bot from "../components/Discord/Bot";
import { ReplaceUrl } from "../pages/Miscellaneous/ReplaceUrl";

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
        path: "/dashboard",
        name: "Dashboard",
        title: "Dashboard",
        requireAuth: true,
        component: <Dashboard/>,
        access: 'protected'
    },
    {
        path: "/bot",
        name: "bot",
        title: "Alert",
        requireAuth: true,
        component: <Bot/>,
        access: 'protected'
    },
    {
        path: "/settings",
        name: "Settings",
        title: "Settings",
        requireAuth: true,
        component: <></>,
        access: 'protected'
    },
    {
        path: "/about",
        name: "About Page",
        title: "About",
        requireAuth: false,
        component: <>Nothing to see</>,
        access: 'public'
    },
    {
        path: "/replace-url",
        name: "Replace Url",
        title: "Replace Url",
        requireAuth: false,
        component: <ReplaceUrl/>,
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