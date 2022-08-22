import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

export const ProductDetail = () => {
  return (
    <Container>
        <Box my={2}>
            <Link to={'/'} style={{ textDecoration: "none", color:'black' }}><Typography component={'span'}> Home</Typography></Link>
            <Typography component={'span'}> {'>'}</Typography>
            <Link to={'/our-shop'} style={{ textDecoration: "none", color:'black' }}><Typography component={'span'}> Our Shop</Typography></Link>
            <Typography component={'span'}> {'>'}</Typography>
            <Typography component={'span'}> {'This title product'}</Typography>
        </Box>
        <Box>
            
        </Box>
    </Container>
  )
}
