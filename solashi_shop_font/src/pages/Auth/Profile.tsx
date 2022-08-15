import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { Alert, AlertTitle, Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Container } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

import { Link } from 'react-router-dom';
import { InputComponent } from '../../components/form/InputComponent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from '../../components/Api';
import { AuthContext } from '../../context/authContext';
import { AuthContextType, User } from '../../@types/auth';
import { AlertComponent } from '../../components/header/AlertComponent';
import { AlertContext } from '../../context/alertContex';
import { AlertContextType } from '../../@types/alert';

// Validation form
const validation = z.object({
    name: z.string().min(1, { message: "The name field is require." }),
    email: z.string().email({ message: "The email field is require." }),
});
const validationPass = z.object({
    old_password: z.string().min(8, { message: "The password must be at least 8 characters." }),
    password: z.string().min(8, { message: "The password must be at least 8 characters." }),
    confirm_password: z.string().min(8, { message: "The password must be at least 8 characters." }),
}).refine(data => data.password === data.confirm_password, { message: "Password cofirm is not correct.", path: ["confirm_password"] });


type AccountForm = z.infer<typeof validation>;
type PassForm = z.infer<typeof validationPass>;

export const Profile = () => {
    const { register, watch, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm<AccountForm>({
        resolver: zodResolver(validation)
    });
    const { register: registerPass, handleSubmit: handleSubmitPass, formState: { errors: errorPass, isSubmitting: isSubmittingPass } } = useForm<PassForm>({
        resolver: zodResolver(validationPass)
    });
    const { user, loginStatus, saveUser, getMe } = React.useContext(AuthContext) as AuthContextType;
    const { open, setAlert } = React.useContext(AlertContext) as AlertContextType;
    const onSubmit: SubmitHandler<AccountForm> = useCallback(async (value) => {
        const res = await Api.post('/update-me', {
            name: value.name,
            email: value.email,
        });
        if (res) {
            console.log(res);
            setAlert({
                status: 'success',
                title: 'Success',
                body: res.data.message
            });
            // let data = res.data;
            saveUser({
                ...user,
                name: value.name,
                email: value.email,
            });
        }
    }, []);
    const onSubmitPass: SubmitHandler<PassForm> = useCallback(async (value) => {
        const res = await Api.post('/update-password', {
            old_pass: value.old_password,
        });
        if (res) {
            console.log(res);
            let data = res.data;
            saveUser({
                ...user,
                ...data.user,
            });
        }
    }, []);
    useEffect(() => {
        if (!user.name) {
            getMe();
        }
    }, []);
    return (
        <Container sx={{ my: 3 }}>
            {open ? (<AlertComponent></AlertComponent>) : null}
            <Card sx={{ borderRadius: '20px', mx: 4, mb: 4 }}>
                <Grid container alignItems='center' justifyContent="space-between" sx={{ minHeight: "200px", display: 'table' }}>
                    <Box p={3} px={5}>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            {user.name && user.email &&
                                (<Box><Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'> Account Information</Typography>
                                    <InputComponent name="name" type="text" label="Name" register={register} va icon={<PersonIcon />} error={errors.name} value={user.name} />
                                    <InputComponent name="email" type="email" label="Email" register={register} icon={<EmailIcon />} error={errors.email} value={user.email} />
                                    <Button fullWidth sx={{ my: 2 }} color='error' variant="contained" type='submit' disabled={isSubmitting}>Change Information</Button></Box>)}
                        </form>
                    </Box>
                </Grid>
            </Card>

            <Card sx={{ borderRadius: '20px', mx: 4 }}>
                <Grid container alignItems='center' justifyContent="space-between" sx={{ minHeight: "200px", display: 'table' }}>
                    <Box p={3} px={5}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'> Change Your Password</Typography>
                            <InputComponent name="old_password" type="password" label="Old Password" register={registerPass} icon={<KeyIcon />} error={errorPass.old_password} />
                            <InputComponent name="password" type="password" label="Password" register={registerPass} icon={<KeyIcon />} error={errorPass.password} />
                            <InputComponent name="confirm_password" type="password" label="Confirm Password" register={registerPass} icon={<KeyIcon />} error={errorPass.confirm_password} />
                            <Button fullWidth sx={{ my: 2 }} color='error' variant="contained" type='submit' disabled={isSubmittingPass}>Change Password</Button>
                        </form>
                    </Box>
                </Grid>
            </Card>
        </Container>
    )
}
