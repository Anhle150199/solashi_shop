import React, { useCallback, useState } from 'react'

import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Container } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

import { Link } from 'react-router-dom';
import { InputComponent } from '../../components/form/InputComponent';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from '../../components/Api';
import { type } from 'os';
import { resolve } from 'path';
import {User} from '../../stores/User';

// Validation form
const validation = z.object({
    name: z.string().min(1, { message: "The name field is require." }),
    email: z.string().email({ message: "The email field is require." }),
    password: z.string().min(8, { message: "The password must be at least 8 characters." }),
    confirm_password: z.string().min(8, { message: "The password confirm must be at least 8 characters." })
}).refine(data => data.password === data.confirm_password, { message: "Password cofirm is not correct.", path: ["confirm_password"] });

type AuthForm = z.infer<typeof validation>;

export const Profile = () => {
    const {setUser, userCurrent} = User();
    const { http } = Api();
    const { register, watch, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<AuthForm>({
        resolver: zodResolver(validation)
    });
    const [statusLogin, setStatusLogin] = useState<string>('');

    const onSubmit: SubmitHandler<AuthForm> = useCallback(async (value) => {
        setStatusLogin('');
        await http.post('/update-me', {
            email: value.email,
            password: value.password
        }).then((res) => {
            console.log(res);
            let data= res.data;
            setUser({
                ... data.user,
                token: data.access_token
            });

        }).catch((res) => {
            console.log(res);
            setStatusLogin("Incorrect email or password.");
        })
    }, []);

    return (
        <Container sx={{ my: 3 }}>
            <Card sx={{ borderRadius: '20px', mx: 4 }}>
                <Grid container alignItems='center' justifyContent="space-between" sx={{ minHeight: "200px", display: 'table' }}>
                    
                        <Box p={3} px={5}>
                            <Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'>Login to your account</Typography>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'>Create an account</Typography>

                                <InputComponent name="name" type="text" label="Name" register= {register} icon={ <PersonIcon />} error={errors.name} />
                                <InputComponent name="email" type="email" label="Email" register= {register} icon={ <EmailIcon />} error={errors.email} />
                                <InputComponent name="password" type="password" label="Password" register= {register} icon={ <KeyIcon />} error={errors.password} />
                                <InputComponent name="confirm_password" type="password" label="Confirm Password" register= {register} icon={ <PersonIcon />} error={errors.confirm_password} />
                                <Button fullWidth sx={{ my: 2 }} color='error' variant="contained" type='submit' disabled={isSubmitting}>Register</Button>
                            </form>
                        </Box>
                </Grid>
            </Card>
        </Container>
    )
}
