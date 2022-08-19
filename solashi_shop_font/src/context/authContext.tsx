import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContextType, User } from '../@types/auth';
import { Api } from "../components/Api";

export const AuthContext = React.createContext<AuthContextType | null>(null);

type PropChildren = {
    children: React.ReactNode,
}

const AuthProvider: React.FC<PropChildren> = ({ children }) => {
    const [loginStatus, setLoginStatus] = React.useState<boolean>(false);
    const [user, setUser]= React.useState<any>({});
    // const { httpAuth } = Api();
    let navigate = useNavigate();

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
        } catch (error:any) {
            console.log(error);
            if(error.response.status == '401'){
                delUser();
            }
            return navigate('/');
        }
    }
    return <AuthContext.Provider value={{ setLoginStatus, loginStatus, user, saveUser, delUser, getMe }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
