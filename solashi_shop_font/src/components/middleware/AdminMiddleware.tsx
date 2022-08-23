import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextType } from '../../@types/auth';
import { AuthContext } from '../../context/authContext';

type PropChildren = {
    children: React.ReactElement,
}

export const AdminMiddleware: React.FC<PropChildren> = ({ children }) => {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext) as AuthContextType;
    let location = useLocation();
    console.log(user);
    
    if (!token || user.is_admin === undefined || user.is_admin === 0) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}
