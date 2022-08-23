import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { ProductType } from '../@types/cart'
import { ThreadHeader } from '../components/header/ThreadHeader'
import { ProductList } from '../components/ProductList'
import { SideBar } from '../components/SideBar'

const thread = [
    {
        title: "Home",
        link: '/'
    },
    {
        title: "Our Shop",
        link: '/our-shop'
    },
]
const productList = [
    {
      title: "New2",
      img: '/images/example/sp1.webp',
      price: 300000,
      priceSale: 300000,
      id: 1,
    },
    {
      title: "Popular2",
      img: '/images/example/sp0.webp',
      price: 300000,
      priceSale: 300000,
      id: 2
    },
    {
      title: "Sale2",
      img: '/images/example/sp3.webp',
      price: 300000,
      priceSale: 300000,
      id: 3
    },
    {
      title: "Sale2",
      img: '/images/example/sp4.webp',
      price: 300000,
      priceSale: 300000,
      id: 3
    }
  ]
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

export const Shop = () => {
    const [productCategory, setProductCategory] = useState<ProductType[]>(productList);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Container>
            <ThreadHeader threads={thread} />
            <Grid container spacing={2}>
                <Grid item xs={3} >
                    <Typography variant='h6' sx={{ textDecorationLine: 'underline' }}>CATEGORY</Typography>
                    <SideBar typePage='shop' />
                </Grid>
                <Grid item xs={9} >
                <ProductList products={productCategory}/>
                </Grid>
            </Grid>
        </Container>
    )
}
