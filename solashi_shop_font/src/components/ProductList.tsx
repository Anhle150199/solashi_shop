import { Card, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from '../@types/cart'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const ProductList = (props:{products:ProductType[]}) => {
    const handleAddToCard = (id: number)=>{
        console.log(id);
        
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {props.products.map((item: ProductType) => (
                <Card raised sx={{ width: 250, m: 2, mb: 4 }}>
                    <CardMedia component="img" height={350} image={item.img} />
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb={1}>
                        <Box mx={5} >
                            <Link to={'/detail/' + item.id} key={item.id} style={{ textDecoration: "none", color: "black" }}>
                                <Typography variant='h6' align='center'>{item.title}</Typography>
                                <Typography align='center'>{item.price} đ</Typography>
                            </Link>
                        </Box>

                        <AddShoppingCartIcon onClick={(event) => handleAddToCard(item.id)} sx={{ color: 'red', cursor: 'pointer', opacity: "80%", p: 1, border: 1, borderColor: "grey.500" }} />
                    </Box>
                </Card>
            ))}
        </Box>
    )
}
