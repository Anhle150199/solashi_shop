export interface Cart {
    id: number;
    name: string;
    email: string;
    token: string;
    is_admin: number;
}

export type CartContextType = {
    loginStatus: boolean;
    cart:Cart;
    setLoginStatus: (status:boolean)=>void;
    saveUser: (user: Cart) => void;
    delUser: () => void;
    getMe: () => Promise<Cart|null>;
};
