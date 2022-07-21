import React from 'react'

import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Container } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

import { Link } from 'react-router-dom';

export const Signup = () => {
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
                    <Typography variant="h4" fontSize={24} fontWeight={600} py={1} align='center'>Create an account</Typography>
                    <FormControl variant="standard" fullWidth sx={{ mb: 2 }} >
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Name
                        </InputLabel>
                        <Input
                            id="name"
                            startAdornment={
                                <InputAdornment position="start" >
                                    <PersonIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ mb: 2 }} >
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Email
                        </InputLabel>
                        <Input
                            id="email"
                            startAdornment={
                                <InputAdornment position="start" >
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
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
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Confirm Password
                        </InputLabel>
                        <Input
                            id="confirm_password"
                            startAdornment={
                                <InputAdornment position="start" >
                                    <KeyIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormGroup sx={{ mb: 2 }}>
                        <FormControlLabel control={<Checkbox />} label="Remember Me" />
                    </FormGroup>
                    <Button fullWidth sx={{ mb: 2 }} color='error' variant="contained">Login</Button>
                    <Box sx={{ display: "flex", mb: 2}}>
                        <Link to="/forgot-password" style={{ width: "100%", textAlign: "end" }}>Forgot Password?</Link>
                    </Box>
                    <Box sx={{ display: "flex", mb: 2}}>
                        <Typography display={'span'} width="100%" align="center">or login with</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: 2}} justifyContent="space-between">
                        <Button variant="contained" sx={{ px:7}}>Facebook</Button>
                        <Button variant="contained" sx={{px:7}} color='error'>Google</Button>
                    </Box>
                    <hr/>
                    <Box sx={{  my: 3}}>
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
