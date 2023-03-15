import { Avatar, Menu } from "@mantine/core"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

interface IMenuItems {
    name: string,
    path: string,
    focused?: boolean,
    disabled?: boolean,
}
const initialItems: IMenuItems[] = [{
    name: 'My Alert',
    path: '/alert'
}, {
    name: 'Settings',
    path: '/settings'
}, 
// {
//     name: 'Logout',
//     path: ''
// }
]
export const DropDown = ({items}: {items?: string[]}) => {
    const [menuItems, setMenuItems] = useState<IMenuItems[]>(initialItems);
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
    }

    return (
        <>
        <Menu position='bottom-end' offset={26}>
            <Menu.Target>
                <Avatar className="cursor-pointer dfa-avatar" color='orange' radius={'xl'}></Avatar>
            </Menu.Target>
            <Menu.Dropdown className="dfa-dropdown">
                {menuItems && menuItems.length > 0 ?
                    <>
                        {menuItems.map(item => <Menu.Item onClick={() => navigate(item.path)} key={item.name}>{item.name}</Menu.Item>)}
                    </> :
                    null
                }
                <Menu.Item onClick={logOut}>Logout</Menu.Item>
            </Menu.Dropdown>
        </Menu>
        </>
    )
}