import * as React from 'react';

import { AuthContextType, User } from '../@types/auth';
import { Api } from "../components/Api";

export const AuthContext = React.createContext<AuthContextType | null>(null);


const AuthProvider: React.VFC<any> = ({ children }) => {
    const [loginStatus, setLoginStatus] = React.useState<boolean>(false);
    const [user, setUser]= React.useState<any>({});
    const { httpAuth } = Api();

    const saveUser = (user: User) => {
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

    const getMe = async () => {
        try {
            const res = await httpAuth.post("/me", {});
            if (res) {
                console.log("get_me",res);
                const data = res.data;
                const newUser = {
                    ...data,
                    ...user
                }
                saveUser(newUser)
                return newUser;
            }
        } catch (error) {
            delUser();
            return {};
        }
    }
    return <AuthContext.Provider value={{ setLoginStatus, loginStatus, user, saveUser, delUser, getMe }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
