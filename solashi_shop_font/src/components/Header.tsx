import { AppBar, Badge, Box, ClickAwayListener, Container, FormControl, Grid, Grow, IconButton, InputBase, InputLabel, List, MenuItem, MenuList, NativeSelect, Paper, Popper, Select, Stack, Toolbar, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled, alpha } from '@mui/material/styles';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { User } from '../stores/User';
import { Api } from "./Api";
import { loginSelector } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import AuthSlice from "../redux/slice/AuthSlice";
import { AccountDropdown } from "./header/AccountDropdown";


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

export const Header = (props: any) => {
    const { setUser, userCurrent } = User();
    const [money, setmoney] = useState();
    const [menuMobile, setMenuMobile] = useState<boolean>();
    const { httpAuth } = Api();
    const login = useSelector(loginSelector);
    const dispatch = useDispatch();

    const handleChangeMoney = (event: any) => {
        console.log(event.target.value);
    }

    const showMenu = () => {
        console.log("xxx");
        setMenuMobile(!menuMobile);
    }

    const createData = (name: string, link: string) => {
        return { name, link };
    }

    const dataMenuAuth = [
        createData("Home", "/"),
        createData("Our Shop", "/shop"),
        createData("On Sale", "/sale"),
        createData("Our Services", "/services"),
        createData("Blog", "/blog"),
        createData("Contact", "/contact"),
    ];
    const dataMenuGuest = [
        ...dataMenuAuth,
        createData("Signin", "/signin"),
        createData("Signup", "/signup"),

    ]
    useEffect(() => {
        if (!userCurrent) {
            dispatch(AuthSlice.actions.setLogin(false))
        } else {
            dispatch(AuthSlice.actions.setLogin(true))
        }
    }, [])


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
            <AppBar position="static" elevation={0} sx={{ bgcolor: "#000000", mt: 1 }}>
                <Toolbar >
                    <Container >
                        {login ?
                            (<List dense={true} sx={{ alignItems: "start", display: { xs: "none", sm: "flex", md: "flex" }, flexWrap: "wrap", justifyContent: "center" }} >

                                {dataMenuAuth.map((item: any) => (
                                    <Link to={item.link} style={{ textDecoration: "none" }} >
                                        <Typography component="span" sx={{ m: 1, mx: 3, }} color="white">
                                            {item.name}
                                        </Typography>
                                    </Link>
                                ))}
                                < AccountDropdown />
                            </List>) : (
                                <List dense={true} sx={{ alignItems: "start", display: { xs: "none", sm: "flex", md: "flex" }, flexWrap: "wrap", justifyContent: "center" }} >

                                    {dataMenuGuest.map((item: any) => (
                                        <Link to={item.link} style={{ textDecoration: "none" }} >
                                            <Typography component="span" sx={{ m: 1, mx: 3, }}>
                                                {item.name}
                                            </Typography>
                                        </Link>
                                    ))}
                                </List>
                            )}
                    </Container>
                    <IconButton sx={{ display: { xs: "block", sm: "none", md: "none" }, color: "white" }} onClick={showMenu}>
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
                {/* <Container sx={{ display: `${menuMobile ? "flex" : "none"}` }}>
                    <List dense={true} sx={{ alignItems: "start", justifyContent: "center", display: { xs: 'content', sm: "none" } }}>
                        
                        {dataMenu.map((item: any, key: number) => (
                            <Link key={key} to={item.link} style={{ textDecoration: "none", display: "block" }}>
                                <Typography component="span" sx={{ m: 1, mx: 3, }} color="white">
                                    {item.name}
                                </Typography>
                            </Link>
                        ))}

                        {login && (<Box>
                            <Link to={'/'} style={{ textDecoration: "none", display: "block" }}>
                                <Typography component="span" sx={{ m: 1, mx: 3, }} color="white">
                                    Profile
                                </Typography>
                            </Link>
                            <Link to={'/'} style={{ textDecoration: "none", display: "block" }}>
                                <Typography component="span" sx={{ m: 1, mx: 3, }} color="white">
                                    My account
                                </Typography>
                            </Link>
                            <Link to={'#'} style={{ textDecoration: "none", display: "block" }}>

                                <Typography component="span" sx={{ m: 1, mx: 3, }} color="white">
                                    Logout
                                </Typography>
                            </Link>

                        </Box>
                        )}
                    </List>
                </Container> */}
            </AppBar>
        </Box>
    )
}
