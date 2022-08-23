import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import InboxIcon from '@mui/material/InboxIcon';
// import MailIcon from '@mui/material/MailIcon';


const menus = [
    {
        title: "Men's Fashion",
        active: true,
        open: false,
        children: [
            {
                title: "Blazer",
                active: false,
                open: false,
                children: [
                    {
                        title: "Blazer",
                        active: false,
                        open: false,
                        children: []
                    },
                    {
                        title: "Blazer",
                        active: false,
                        open: false,
                        children: []
                    },]
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
        ],
    },
    {
        title: "Men's Fashion",
        active: true,
        open: false,
        children: [
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
        ],
    },
    {
        title: "Men's Fashion",
        active: true,
        open: false,
        children: [
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
            {
                title: "Blazer",
                active: false,
                open: false,
                children: []
            },
        ]
    },
    {
        title: "Men's Fashion",
        active: true,
        open: false,
        children: [],
    }
]

type SideBarType = {
    title: string,
    active: boolean,
    open: boolean,
    children: SideBarType[]
}

export const SideBar = (props: { typePage: string }) => {
    const [menu, setMenu] = useState<SideBarType[]>(menus);

    const show = (category: SideBarType[], level = 0) => {
        return (
            <List sx={{ml: (level*3)}} >
                {category.map((item: SideBarType, index: number) => (
                    <Box>
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{p: 0}}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem><Divider />
                        {item.children.length != 0 ? show(item.children, level + 1) : null}
                    </Box>
                ))}
            </List>
        )
    }

    return (
        <Box>
            {show(menu)}
        </Box>
    );
}
