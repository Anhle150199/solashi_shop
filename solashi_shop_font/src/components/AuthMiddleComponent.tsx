import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

type PropChildren = {
    children: React.ReactElement,
}

export const AuthMiddleComponent: React.FC<PropChildren> = ({ children }) => {
    const token = localStorage.getItem('token');
    let location = useLocation();
    if (!token) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
}
