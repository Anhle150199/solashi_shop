import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Footer } from '../Footer';
import { Header } from '../header/Header';
type PropChildren = {
    children: React.ReactElement,
}

export const Guest: React.FC<PropChildren> = ({ children }) => {
    return (
        <Box>
            <Header />
            {children}
            <Footer />
        </Box>
    );
}