import { FormControl, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React from 'react'
import KeyIcon from '@mui/icons-material/Key';

export const InputComponent = (props:any) => {
    return (
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="input-with-icon-adornment">
                {props.label}
            </InputLabel>
            <Input
                type={props.type}
                {...props.register(props.name)}
                startAdornment={
                    <InputAdornment position="start" >
                        {props.icon}
                    </InputAdornment>
                }
                defaultValue= {props.value ? props.value: null}
            />
             <Typography variant="caption" color="error" >{props.error?.message}</Typography>

        </FormControl>
    )
}
