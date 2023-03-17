import { useLocation, useNavigate } from "react-router-dom";
import "./navigator.scss";
import { useCallback, useEffect, useState } from "react";
import { text } from "node:stream/consumers";

const nav = [{
    title: "Dashboard",
    path: "dashboard",
    active: false,
}, {
    title: "Logs",
    path: "logs",
    active: false,
}, {
    title: "Settings (TBA)",
    path: "settings",
    active: false,
}]

export default function Navigator () {
    const [navLink, setNavLink] = useState(nav);

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        navLink.map(k => {
            if(k.path === location.pathname.replace('/', '')) {
                k.active = true;
            } else {
                k.active = false;
            }
        })
        setNavLink(navLink);
        
    }, [location.pathname, navLink]);

    const onSelect = (target: string) => {
        navLink.map(k => {
            if(k.path === target) {
                k.active = true;
            } else {
                k.active = false;
            }
        });
        setNavLink([...navLink]);
        navigate(`/${target}`)
    }

    const scrollElement = document.getElementById("selected");
    if(scrollElement) {
        scrollElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    const begin = async () => {
        const scrollElement = document.getElementById("selected");
        if(scrollElement) {
            scrollElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
    <div className="navigator">
        <div className="nav-panel" onMouseLeave={async () => await begin()}>
            {navLink.map(k => 
                <div 
                    onClick={() => onSelect(k.path)}
                    key={k.title}
                    id={`${k.active === true ? 'selected' : null}`}
                    className={`nav-text ${k.active ? 'active' : null}`}
                >
                    {k.title}
                </div>
            )}
        </div>
    </div>
    )
}