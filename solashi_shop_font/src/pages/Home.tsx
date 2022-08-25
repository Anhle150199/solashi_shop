import { Box, Card, CardMedia, Container, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { color } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { NEW_PRODUCT, POPULAR_PRODUCT, SALE_PRODUCT } from "../@lib/titleCategoryHome";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ProductList } from '../components/ProductList';
import { dataExample, ProductType } from '../@types/cart';


const slideImages = [
  {
    url: 'images/example/1.png',
    title: 'Cô nàng cá tính',
    subtitle: 'NEW ARRIVAL'
  },
  {
    url: 'images/example/2.png',
    subtitle: 'Bộ sưu tập mùa đông',
    title: "NEW ARRIVAL"
  },
  {
    url: 'images/example/3.png',
    subtitle: 'Bộ sưu tập mùa hè',
    title: "LOOK BOOK"
  },
];

const listTitle = [
  {
    title: NEW_PRODUCT,
    active: true
  },
  {
    title: POPULAR_PRODUCT,
    active: false
  },
  {
    title: SALE_PRODUCT,
    active: false
  }
]
const productList: ProductType[] = dataExample;

const productList2: ProductType[] = dataExample;

const productList3: ProductType[] = dataExample;

type TitleHome = { title: string, active: boolean };
export const Home = () => {
  const [products, setProducts] = useState<ProductType[]>(productList);
  const [titles, setTitle] = useState<TitleHome[]>(listTitle);

  const getProductsList = (type: string) => {
    switch (type) {
      case NEW_PRODUCT:
        setProducts(productList);
        break;
      case POPULAR_PRODUCT:
        setProducts(productList2);
        break;
      case SALE_PRODUCT:
        setProducts(productList3);
        break;
    }
  }

  const handleTitle = (event: React.MouseEvent<HTMLElement>, item: TitleHome) => {
    const newTitles: TitleHome[] = titles.map((item2: any) => {
      (item2.title === item.title) ? item2.active = true : item2.active = false;
      return item2;
    })
    setTitle(newTitles);
    getProductsList(item.title);
  }

  const handleAddToCard = (id: number) => {

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <Box key={index}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'end'} sx={{ 'backgroundImage': `url(${slideImage.url})`, minHeight: '350px', "backgroundSize": "cover" }}>
              <Box width={"100%"} mb={5}>
                <Typography variant='h3' width={"100%"} align={'center'} fontWeight={700}>{slideImage.title}</Typography  >
                <Typography width={"100%"} align={'center'}>{slideImage.subtitle}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Slide>
      <Box display={'flex'} my={3}>
        {titles.map((item: any) =>
          item.active ?
            <Typography variant='h6' key={item.title} mx={2} sx={{ "cursor": "pointer", fontWeight: '600' }} >{item.title}</Typography> :
            <Typography
              onClick={(event) => handleTitle(event, item)}
              variant='h6' key={item.title} mx={2} sx={{ "cursor": "pointer", fontWeight: '600', opacity: "50%" }}>{item.title}</Typography>
        )}
      </Box>
      <ProductList products={products} />
    </Container >
  )
}
