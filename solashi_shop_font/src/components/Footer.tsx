import { Box, Grid, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Link } from '@mui/material'
import { Container } from '@mui/system'
import React, { JSXElementConstructor } from 'react'
import { Link as LinkDom } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { JsxElement } from 'typescript';

export const Footer = () => {

    // const 
    function createData(
        key: string,
        value: string,
    ) {
        return { key, value };
    }
    function createShares(name: string, icon: any, link: string) {
        return { name, icon, link };
    }
    const rows = [
        createData('C.', 'Solashi Shop'),
        createData('B.', '108 Chinhoyi Street, Central Business District, Harare Zimbabwe'),
        createData('T.', '+263782149840'),
        createData('E.', 'rvmseamaf@gmail.com'),
    ];
    const links = [
        createData('About Us', '/about'),
        createData('Track Orders', '/about'),
        createData('Shipping', '/about'),
        createData('Contact', '/about'),
        createData('My Orders', '/about'),
        createData('Support', '/about'),
        createData('Terms of Use', '/about'),
        createData('Privacy Policy', '/about'),
        createData('Our Services', '/about'),
        createData('Blog', '/about'),
    ]

    const shares = [
        createShares('instagram', <InstagramIcon />, 'https://www.instagram.com/rvmseamaf_trading/'),
        createShares('pinterest', <PinterestIcon />, 'https://www.pinterest.com/rvmseamaf/_created/'),
        createShares('facebook', <FacebookIcon />, 'https://www.facebook.com/rvmseamaf'),
        createShares('twitter', <TwitterIcon />, 'https://twitter.com/RvmSeamaf'),
        createShares('youtube', <YouTubeIcon />, 'https://www.youtube.com/channel/UCeax4jI_DJkAGzx0q5V6R2w'),
        createShares('linkedin', <LinkedInIcon />, 'https://www.linkedin.com/company/rvm-seamaf/'),
    ]

    const getYear = () => {
        return new Date().getFullYear();
    }
    return (
        <Box bgcolor={'black'} color="white">
            <Box p={3} sx={{ borderBottom: 1, pb: 3, borderColor: 'secondary.main' }}>
                <Container >
                    <Grid container justifyContent="space-between" >
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant='h6' fontWeight={700}>ABOUT</Typography>
                            <Typography mb={3} color={'secondary'}>Online &#38; physical bead shop with the best beads and beading supplies in Zimbabwe ✓ Over 9000 beads for jewelry making ✓ Glass beads ✓ Beading supplies and much more!</Typography>
                            {/* <img src="https://seamaf.com/frontend/img/cards.png" alt="" /> */}

                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant='h6' fontWeight={700}>USEFUL LINKS</Typography>
                            <List dense={true} style={{ columnCount: '2' }}>
                                {links.map((link, key) => (
                                    <ListItem key={key} >
                                        {/* <Link to={link.value}>{link.key}</Link> */}
                                        <Link href={link.value} color={"secondary"} underline="none">{link.key}</Link>

                                    </ListItem>
                                ))}

                            </List>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant='h6' fontWeight={700}>BLOG</Typography>
                            <Box>
                                <Box flex={"table"}>
                                    <Box sx={{
                                        mx: 2,
                                        background: `url(${process.env.PUBLIC_URL + '/images/system/background.jpg'})`,
                                        display: "table-cell",
                                        width: "30%"
                                    }}
                                        style={{ backgroundSize: 'cover' }}></Box>
                                    <Box sx={{ display: "table-cell", px: 3 }}>
                                        <Typography variant='h6' fontSize={15} >BOHE MIAN WEDDING THEME</Typography>
                                        <Typography component='span' display={'block'} fontSize={13} color={"secondary"}>1 year ago</Typography>
                                        <Link href='/' color={'error'} underline="none" fontSize={13} >Read More</Link>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant='h6' fontWeight={700}>CONTACT</Typography>
                            {/* <TableContainer component={Paper}> */}
                            <Table  >
                                <TableBody>
                                    {rows.map((row, key) => (
                                        <TableRow key={key}  >
                                            <TableCell sx={{ color: "red", border: "none", p: 1 }} component="th" scope="row">
                                                {row.key}
                                            </TableCell>
                                            <TableCell sx={{ color: "#bdbdbd", border: "none", p: 1 }} >{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* </TableContainer> */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box>
                <Container  >
                    <Box display={'block'} >
                        <List dense={true} style={{ display: 'flex', alignItems: "start" }} >
                            {shares.map((share, key) => (
                                <Link href={share.link} key={key}  underline="none" fontSize={13} mx={1} color={'secondary'} style={{ display: 'flex', alignItems: "center" }}>
                                    {share.icon}
                                    <Typography mx={1} component={"span"} sx={{ display: { xs: 'none', sm: 'none', md: 'contents' } }}>{share.name}</Typography>
                                </Link>
                            ))}
                        </List>
                    </Box>
                    <Typography p={3} align="center">Copyright ©{getYear()} All rights reserved | Developed By <Link href="https://github.com/Anhle150199/solashi_shop" color={'secondary'} underline="none" target="_blank">Anh LX</Link></Typography>
                </Container>
            </Box>
        </Box>
    )
}
