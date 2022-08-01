import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextType } from '../@types/auth';
import { AuthContext } from '../context/authContext';

export const AuthMiddleComponent: React.VFC<any> = ({ children }: { children: JSX.Element }) => {
    const { loginStatus } = React.useContext(AuthContext) as AuthContextType;

    let location = useLocation();

    if (!loginStatus) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
}
