import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Container } from '@mui/system'

import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from '../../components/Api';
import { InputComponent } from '../../components/form/InputComponent';
import { AuthContext } from '../../context/authContext';
import { AuthContextType } from '../../@types/auth';

// Validation form
const validation = z.object({
    email: z.string().email({ message: "The email field is require." }),
    password: z.string().min(8, { message: "The password must be at least 8 characters." }),
    remember: z.boolean(),
});

type AuthForm = z.infer<typeof validation>;

export const Signin = (props: any) => {
    let navigate = useNavigate();
    const { saveUser } = React.useContext(AuthContext) as AuthContextType;

    const { http } = Api();
    const { register, watch, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<AuthForm>({
        resolver: zodResolver(validation)
    });

    const onSubmit: SubmitHandler<AuthForm> = useCallback(async (value) => {
        try {
            const res = await http.post('/login', {
                email: value.email,
                password: value.password,
                remember: value.remember,
            })

            if (res) {
                console.log(res);
                const data = res.data;
                saveUser({
                    ...data.user,
                    token: data.access_token
                })
                return navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert("Incorrect email or password.")
        }
    }, []);

    return (
        <Container sx={{ my: 3 }}>
            <Card sx={{ borderRadius: '20px', mx: 4 }}>
                {/* <CardContent sx={{p:0, pb:0}}> */}
                <Grid container alignItems='center' justifyContent="space-between" sx={{ minHeight: "200px", display: 'table' }}>
                    <Grid item xs={12} sm={6}
                        sx={{
                            m: 0,
                            background: `url(${process.env.PUBLIC_URL + '/images/system/background.jpg'})`,
                            display: "table-cell",
                            width: "50%"
                        }}
                        style={{ backgroundSize: 'cover' }}
                    >
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "table-cell" }}>
                        <Box p={3} px={5}>
                            <Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'>Login to your account</Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <InputComponent name="email" type="email" label="Email" register={register} icon={<EmailIcon />} error={errors.email} />
                                <InputComponent name="password" type="password" label="Password" register={register} icon={<KeyIcon />} error={errors.password} />
                                {/* <InputComponent name="remember" type="checkbox" label="Remember" register={register} /> */}

                                <FormGroup sx={{ mb: 2 }}>
                                    <FormControlLabel control={<Checkbox {...register("remember")} />} label="Remember Me" disabled={isSubmitting} />
                                </FormGroup>
                                <Button fullWidth sx={{ mb: 2 }} color='error' variant="contained" type='submit' disabled={isSubmitting}>Login</Button>
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
                                <Typography width="100%" align="center">Check out as a guest? <Link to="/">Click Here</Link> </Typography>
                                <Typography width="100%" align="center">Don't have an account? <Link to="/">Register Here</Link> </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {/* </CardContent> */}
            </Card>
        </Container>
    )
}
