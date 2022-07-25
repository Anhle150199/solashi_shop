import React, { useCallback } from 'react'

import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Container } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

import { Link } from 'react-router-dom';
import { Password } from '../../components/layouts/Password';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type } from 'os';
import { resolve } from 'path';

const validation = z.object({
    name: z.string().min(1, { message: "The name field is require." }),
    email: z.string().email({ message: "The email field is require." }),
    password: z.string().min(8, { message: "The password must be at least 8 characters." }),
    confirm_password: z.string().min(8, { message: "The password confirm must be at least 8 characters." })
}).refine(data => data.password === data.confirm_password, { message: "Password cofirm is not correct.", path: ["confirm_password"] });

type AuthForm = z.infer<typeof validation>;

export const Signup = () => {
    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthForm>({
        resolver: zodResolver(validation)
    });


    const onSubmit: SubmitHandler<AuthForm> = useCallback(async (value) => {
        await new Promise(async (resolve) => {
            await setTimeout(() => {
                console.log(value);
            }, 5000);
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
                                <FormControl variant="standard" fullWidth sx={{ mb: 2 }} >
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Name
                                    </InputLabel>
                                    <Input
                                        id="name"
                                        {...register("name")}
                                        disabled={isSubmitting}
                                        startAdornment={
                                            <InputAdornment position="start" >
                                                <PersonIcon />
                                            </InputAdornment>
                                        }
                                    />
                                    <Typography variant="caption" color="error" >{errors.name?.message}</Typography>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ mb: 2 }} >
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Email
                                    </InputLabel>
                                    <Input
                                        id="email"
                                        type='email'
                                        startAdornment={
                                            <InputAdornment position="start" >
                                                <EmailIcon />
                                            </InputAdornment>
                                        }
                                        {...register("email")}
                                        disabled={isSubmitting}
                                    />
                                    <Typography variant="caption" color="error" >{errors.email?.message}</Typography>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Password
                                    </InputLabel>
                                    <Input
                                        id="password"
                                        type='password'
                                        startAdornment={
                                            <InputAdornment position="start" >
                                                <KeyIcon />
                                            </InputAdornment>
                                        }
                                        {...register("password")}
                                        disabled={isSubmitting}
                                    />
                                    <Typography variant="caption" color="error" >{errors.password?.message}</Typography>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Confirm Password
                                    </InputLabel>
                                    <Input
                                        id="confirm_password"
                                        type='password'
                                        startAdornment={
                                            <InputAdornment position="start" >
                                                <KeyIcon />
                                            </InputAdornment>
                                        }
                                        {...register("confirm_password")}
                                        disabled={isSubmitting}
                                    />
                                    <Typography variant="caption" color="error" >{errors.confirm_password?.message}</Typography>
                                </FormControl>
                                {/* <Password id='confirm_password' /> */}
                                <FormGroup sx={{ mb: 2 }}>
                                    <FormControlLabel control={<Checkbox />} label="Remember Me" disabled={isSubmitting} />
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
