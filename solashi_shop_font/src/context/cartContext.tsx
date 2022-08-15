import * as React from 'react';

import { CartContextType, Cart } from '../@types/cart';
import { Api } from "../components/Api";

export const CartContext = React.createContext<CartContextType | null>(null);

type PropChildren = {
    children: React.ReactNode,
}

const CartProvider: React.FC<PropChildren> = ({ children }) => {
    const [loginStatus, setLoginStatus] = React.useState<boolean>(false);
    const [cart, setUser]= React.useState<any>({});
    // const { httpAuth } = Api();

    const saveUser = (user: Cart) => {
        console.log("user", user);
        localStorage.setItem('token', user.token);
        setUser(user);
        setLoginStatus(true);
    };

    const delUser = () => {
        localStorage.removeItem('token');
        setUser({});
        setLoginStatus(false);
    };

    const getMe  = async () => {
        try {
            const res = await Api.post("/me", {});
            if (res) {
                console.log("get_me",res);
                const data = res.data;
                const newUser = {
                    ...data,
                    token: localStorage.getItem('token')
                }
                console.log('new', newUser);
                
                saveUser(newUser)
                return newUser;
            }
        } catch (error) {
            delUser();
            return {};
        }
    }
    return <CartContext.Provider value={{ setLoginStatus, loginStatus, cart, saveUser, delUser, getMe }}>{children}</CartContext.Provider>;
};

export default CartProvider;
