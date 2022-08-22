import { Button, Card, CardMedia, Grid, Input, InputBase, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ProductType } from '../@types/cart';
import { ProductList } from '../components/ProductList';

const imgpre = ['/images/example/sp1.webp', '/images/example/sp0.webp', '/images/example/sp3.webp', '/images/example/sp4.webp']
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
export const ProductDetail = () => {
    const [product, setProduct] = useState<ProductType>();
    const [productRelate, setProductRelate] = useState<ProductType[]>(productList);
    const [images, setImages] = useState<string[]>(imgpre);
    const [activeImage, setActiveImage] = useState<string>();
    const [quantity, setQuantity] = useState<number>(0);

    const hanldeAddToCart = () => {
        console.log(quantity);

    }

    useEffect(() => {
        const images = imgpre;
        setActiveImage(images[0]);
    }, [])

    return (
        <Container>
            <Box my={2}>
                <Box mb={4}>
                    <Link to={'/'} style={{ textDecoration: "none", color: 'black' }}><Typography component={'span'}> Home</Typography></Link>
                    <Typography component={'span'}> {'>'}</Typography>
                    <Link to={'/our-shop'} style={{ textDecoration: "none", color: 'black' }}><Typography component={'span'}> Our Shop</Typography></Link>
                    <Typography component={'span'}> {'>'}</Typography>
                    <Typography component={'span'}> {'This title product'}</Typography>
                </Box>
                <Grid container p={0} spacing={2}>
                    <Grid item sm={12} md={6} >
                        {activeImage && images &&
                            <Grid container spacing={2}>
                                <Grid p={0} item xs={9} >
                                    <Card raised sx={{ width: '100%' }}>
                                        <CardMedia component="img" height={'auto'} sx={{ maxHeight: 750 }} image={activeImage} />
                                    </Card>
                                </Grid>
                                <Grid item xs={3} sx={{ overflowX: 'hidden', padding: 0 }} maxHeight={530}>
                                    {images.map((item: any) => (
                                        <Card raised sx={{ width: '95%', mb: 2, }}>
                                            <CardMedia component="img" height={'auto'} image={item} />
                                        </Card>
                                    ))}
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs={6} >
                        <Box m={2}>
                            <Typography variant='h4' mb={2}>Áo Chery thời trang</Typography>
                            <Typography component={'span'}>200,000 ₫ </Typography>
                            <Typography component={'span'} sx={{ textDecorationLine: 'line-through', opacity: '50%', }}>300,000 ₫</Typography>
                            <Box mt={4} mb={7}>
                                - Áo Chery thời trang thiết kế trẻ trung, hiện đại mang đến cho bạn gái phong cách năng động nhưng không kém phần nữ tính.
                                - Chất liệu vải tuyết mưa thông thoáng, thấm hút mồ hôi tốt, tạo cảm giác thoải mái cho người mặc.
                                - Với chiếc đầm này, bạn có thể mặc bất cứ khi nào: tới công sở, dạo phố, dã ngoại…
                            </Box>
                            <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: "grey.500" }}>
                                <Box my={3}>
                                    <Typography component={'span'}>Quantity:</Typography>
                                    <InputBase onChange={(event) => setQuantity(parseInt(event.target.value))} sx={{ width: 75, border: 1, borderColor: "grey.500", textAlign: 'center', mx: 2 }} name='quantity' defaultValue={1} type='number' />
                                    <Typography component={'span'}>200,000 ₫</Typography>
                                </Box>
                                <Box my={3} display="flex" alignItems={'center'} >
                                    <Button onClick={() => hanldeAddToCart()} sx={{ bgcolor: 'red', px: 2, color: 'white', ":hover": { color: 'black' }, mx:3}} ><Typography component={'span'} sx={{}}>Add to cart</Typography></Button>
                                    <FavoriteBorderIcon sx={{color:'red', cursor: 'pointer', p: 1, border:1, borderColor: "grey.500"}}/>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box my={4}>
            <Typography variant='h3' mb={2}>Related products</Typography>

            <ProductList products={productRelate}/>
            </Box>
        </Container>
    )
}
