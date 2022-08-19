import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContextType, User } from '../@types/auth';
import { Api } from "../components/Api";
import AuthProvider from './authContext';

// export const AuthContext = React.createContext<AuthContextType | null>(null);

type PropChildren = {
    children: React.ReactNode,
}

const BaseProvider: React.FC<PropChildren> = ({ children }) => {

    return (
            <AuthProvider>
                {children}
            </AuthProvider>
    )
};

export default BaseProvider;
