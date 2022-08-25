import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton';
import { CategoryType } from '../@types/category';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import InboxIcon from '@mui/material/InboxIcon';
// import MailIcon from '@mui/material/MailIcon';


const menus = [
    {
        id: 1,
        title: "Men's Fashion",
        active: true,
        open: false,
        created_at: '12/5/2021',
    },
    {
        id: 1,
        title: "Men's Fashion",
        active: true,
        open: false,
        created_at: '12/5/2021',
    },
    {
        id: 1,
        title: "Men's Fashion",
        active: true,
        open: false,
        created_at: '12/5/2021',
    },
    {
        id: 1,
        title: "Men's Fashion",
        active: true,
        open: false,
        created_at: '12/5/2021',
    }
]


export const SideBar = (props: { typePage: string }) => {
    const [menu, setMenu] = useState<CategoryType[]>(menus);

    const show = (category: CategoryType[]) => {
        return (
            <List >
                {category.map((item: CategoryType, index: number) => (
                    <Box>
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{ p: 0 }}>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem><Divider />
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
