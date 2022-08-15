import { Alert, AlertTitle, Collapse } from '@mui/material'
import React, { useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AlertContext } from '../../context/alertContex';
import { AlertContextType } from '../../@types/alert';

export const AlertComponent = () => {
    const {open, setOpen, title, status, body} = React.useContext(AlertContext) as AlertContextType;
    useEffect(()=>{
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    })
    return (
            <Collapse in={open}>
                <Alert variant="filled" severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mx: 3 , position: "absolute", right:0, minWidth: 200}}
                >
                    <AlertTitle>{title}</AlertTitle>
                {body}
                </Alert>
            </Collapse>
    )
}
