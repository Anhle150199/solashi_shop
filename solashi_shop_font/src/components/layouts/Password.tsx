import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import React from 'react'
import KeyIcon from '@mui/icons-material/Key';

export const Password = (id: string, register: any) => {
    return (
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="input-with-icon-adornment">
                Confirm Password
            </InputLabel>
            <Input
                id={id}
                type='password'
                {...register("confirm_password")}
                startAdornment={
                    <InputAdornment position="start" >
                        <KeyIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
