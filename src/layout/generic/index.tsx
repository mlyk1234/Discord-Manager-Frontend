import { AppShell, Header } from '@mantine/core';
import { useEffect } from 'react';
import styles from './index.module.scss';

interface IViewBaseProps {
    children: {
        header?: JSX.Element,
        body?: JSX.Element,
        footer?: JSX.Element
    }
}

export const Generic = ({ children }: IViewBaseProps) => {

    return (
        <>
            {children.header}
            {children.body}
            {children.footer}
        </>
    )
}