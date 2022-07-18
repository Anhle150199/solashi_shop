import { AppBar, Badge, Box, Button, Container, FormControl, Grid, IconButton, InputBase, InputLabel, MenuItem, NativeSelect, Select, Stack, Toolbar, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled, alpha } from '@mui/material/styles';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "50rem",
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        // width: '90%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

export const Header = () => {
    const [money, setmoney] = useState();
    
    const handleChangeMoney = (event: any) => {
        console.log(event.target.value);
    }
    const showMenu = ()=>{
        console.log("xxx");
        
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container >
                <Grid container alignItems='center' sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={2} sx={{ mt: 2 }} >
                        <Typography
                            flex={1}
                            variant="h6"
                            noWrap
                            component="div"
                            align="center"
                        >
                            Solashi Shop
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}  >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Grid container justifyContent='center'>
                            <FormControl sx={{ minWidth: 132, m: 1 }} size='small'>
                                <Select
                                    value={money}
                                    defaultValue='1'
                                    onChange={handleChangeMoney}
                                    displayEmpty
                                    sx={{ p: 0 }}
                                // inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={1}>U.S Dollar</MenuItem>
                                    <MenuItem value={2}>RTGS Dollar</MenuItem>
                                    <MenuItem value={3}>SA Rand</MenuItem>
                                    <MenuItem value={4}>British Pound</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{ minWidth: 50, m: 1 }} >
                                <Link to="/" style={{ textDecoration: "none", color: "black" }} >
                                    <Typography ><FavoriteBorderIcon />Wishlist</Typography>
                                </Link>
                            </Box>
                            <Box sx={{ minWidth: 50, m: 1 }} justifyContent="center">
                                <Link to="/" style={{ textDecoration: "none", color: "black" }} >
                                    <Badge badgeContent={4} color="error" sx={{ m: 1 }}>
                                        <ShoppingBagOutlinedIcon />
                                    </Badge>
                                    <Typography component="span">
                                        Shopping Cart
                                    </Typography>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <AppBar position="static" elevation={0} sx={{ bgcolor:"#000000", mt:1}}>
                <Toolbar >
                    <Container sx={{ display:{xs:"none", sm:"none", md:"flex"}, flexWrap:"wrap", justifyContent:"center"}}>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3 }} color="white">
                                Home
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3, whiteSpace:"nowrap"}} color="white">
                                Our Shop
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3, whiteSpace:"nowrap" }} color="white">
                                On Sale
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3, whiteSpace:"nowrap" }} color="white">
                                Our Services
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3 }} color="white">
                                Blog
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3 }} color="white">
                                Contact
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3 }} color="white">
                                Signin
                            </Typography>
                        </Link>
                        <Link to='/' style={{ textDecoration: "none"}}>
                            <Typography component="span" sx={{ m: 1, mx: 3 }} color="white">
                                Signup
                            </Typography>
                        </Link>

                    </Container>
                    <IconButton sx={{display:{ sm:"block", md:"none"}, color:"white", right:"-90%"}} onClick={showMenu}> 
                        <MenuIcon/>
                    </IconButton>
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}
