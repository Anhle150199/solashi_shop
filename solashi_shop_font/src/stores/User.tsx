import React, { useState } from 'react'

export const User = () => {

    function getUser() {
        const tokenString: any = localStorage.getItem('token');
        const user = JSON.parse(tokenString);
        return user;
    }
    const [userCurrent, setUserCurrent] = useState(getUser());

    function setUser(user: JSON) {
        localStorage.setItem('token', JSON.stringify(user));
    }
    function delUser() {
        localStorage.removeItem('token')
    }

    return {
        setUser,
        userCurrent,
        delUser
    }
}
