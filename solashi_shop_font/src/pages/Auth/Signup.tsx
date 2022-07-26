import React, { useCallback } from 'react'

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

export const Signup = () => {
    
    const { http } = Api();
    const {setUser} = User();
    const { register, watch, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<AuthForm>({
        resolver: zodResolver(validation)
    });

    const onSubmit: SubmitHandler<AuthForm> = useCallback(async (value) => {
        await http.post('/register', {
            name: value.name,
            email: value.email,
            password: value.password,
            password_confirmation: value.confirm_password
        }).then((res) => {
            let data= res.data;
            setUser({
                ... data.user,
                token: data.access_token
            });
        }).catch((res) => {
            let errorsApi = JSON.parse(res.response.request.response).errors;
            console.log(errorsApi);
            setError("email", {type: "manual", message: errorsApi.email});
        })
    }, []);

    return (
        <Container sx={{ my: 3 }}>
            <Card sx={{ borderRadius: 20, mx: 4 }}>
                {/* <CardContent sx={{p:0, pb:0}}> */}
                <Grid container alignItems='center' justifyContent="space-between" sx={{ minHeight: "200px", display: 'table' }}>
                    <Grid item xs={12} sm={6}
                        sx={{
                            m: 0,
                            background: `url('/images/system/background.jpg')`,
                            display: "table-cell",
                            width: "50%"
                        }}
                        style={{ backgroundSize: 'cover' }}
                    >
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "table-cell" }}>
                        <Box p={3} px={5}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'>Create an account</Typography>

                                <InputComponent name="name" type="text" label="Name" register= {register} icon={ <PersonIcon />} error={errors.name} value=''/>
                                <InputComponent name="email" type="email" label="Email" register= {register} icon={ <EmailIcon />} error={errors.email} value='' />
                                <InputComponent name="password" type="password" label="Password" register= {register} icon={ <KeyIcon />} error={errors.password} value='' />
                                <InputComponent name="confirm_password" type="password" label="Confirm Password" register= {register} icon={ <PersonIcon />} error={errors.confirm_password} value='' />
                                <Button fullWidth sx={{ my: 2 }} color='error' variant="contained" type='submit' disabled={isSubmitting}>Register</Button>
                            </form>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <Link to="/forgot-password" style={{ width: "100%", textAlign: "end" }}>Forgot Password?</Link>
                            </Box>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <Typography display={'span'} width="100%" align="center">or login with</Typography>
                            </Box>
                            <Box sx={{ display: "flex", mb: 2 }} justifyContent="space-between">
                                <Button variant="contained" sx={{ px: 7 }}>Facebook</Button>
                                <Button variant="contained" sx={{ px: 7 }} color='error'>Google</Button>
                            </Box>
                            <hr />
                            <Box sx={{ my: 3 }}>
                                <Typography width="100%" align="center">Already have an account?  <Link to="/" style={{ textDecoration: "none"}}>Login Here</Link> </Typography>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
                {/* </CardContent> */}
            </Card>
        </Container>
    )
}
