import { useState } from 'react'

export const Token = () => {

    function getUser() {
        const tokenString: any = localStorage.getItem('auth');
        const user = JSON.parse(tokenString);
        return user;
    }
    const [userCurrent, setUserCurrent] = useState(getUser());

    function setUser(user: JSON) {
        localStorage.setItem('auth', JSON.stringify(user));
    }
    function removeUser() {
        localStorage.removeItem('auth')
    }

    return {
        setUser,
        userCurrent,
        removeUser
    }
}
