import { createContext, useContext, useState } from 'react';
import React from 'react';
import type {User} from "../types";

interface UserContextType {
    user: User | null;
    Loading: boolean;
    setLoading: (isLoading: boolean) => void;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [Loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated,Loading,setLoading,setIsAuthenticated}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
