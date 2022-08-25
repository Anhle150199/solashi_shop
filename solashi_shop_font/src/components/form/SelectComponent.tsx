import { FormControl, Input, InputAdornment, InputLabel, NativeSelect, Typography } from '@mui/material'
import React from 'react'
import KeyIcon from '@mui/icons-material/Key';

export const SelectComponent = (props: any) => {
    return (
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                {props.label}
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
            >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </NativeSelect>
        </FormControl>


    )
}
