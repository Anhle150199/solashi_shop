export interface Alert {
    status: string;
    title: string;
    body: string;
}

export type AlertContextType = {
    open: boolean;
    status: string;
    title: string;
    body: string;
    setAlert: (alert:Alert)=>void;
    setOpen:(open:boolean)=>void;
};
