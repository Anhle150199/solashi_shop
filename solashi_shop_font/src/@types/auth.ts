export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
    is_admin: number;
}

export type AuthContextType = {
    loginStatus: boolean;
    user:User;
    setLoginStatus: (status:boolean)=>void;
    saveUser: (user: User) => void;
    delUser: () => void;
    getMe: () => Promise<User|null>;
};
