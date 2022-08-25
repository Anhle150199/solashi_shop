import * as React from 'react';

import { CartContextType, CartType } from '../@types/cart';
import { Api } from "../components/Api";

export const CartContext = React.createContext<CartContextType | null>(null);

type PropChildren = {
    children: React.ReactNode,
}

const CartProvider: React.FC<PropChildren> = ({ children }) => {
    const [cart, setCart]= React.useState<any>({});
    // const { httpAuth } = Api();

    return <CartContext.Provider value={{  cart, }}>{children}</CartContext.Provider>;
};

export default CartProvider;
