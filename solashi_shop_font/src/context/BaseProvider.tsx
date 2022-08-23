import * as React from 'react';
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
