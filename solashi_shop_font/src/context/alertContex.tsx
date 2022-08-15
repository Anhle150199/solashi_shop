import * as React from 'react';

import { AlertContextType, Alert } from '../@types/alert';

export const AlertContext = React.createContext<AlertContextType | null>(null);

type PropChildren = {
    children: React.ReactNode,
}

const AlertProvider: React.FC<PropChildren> = ({ children }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [body, setBody] = React.useState<string>('');

    const setAlert = (alert: Alert) => {
        setStatus(alert.status);
        setTitle(alert.title);
        setBody(alert.body);
        setOpen(true);
    };

    return <AlertContext.Provider value={{ open, status, title, body, setAlert, setOpen }}>{children}</AlertContext.Provider>;
};

export default AlertProvider;
