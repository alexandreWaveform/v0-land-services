import { createContext, ReactNode, useContext, useState } from "react";

//import { User } from "@models/user.model";

type UserContextType = {
    userEmail: string,
    setUserEmail: (email: string) => void
}

// Define the shape of the context and use undefined because the context will be initialized later
// and will not have a value at the beginning
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
type UserProviderProps = {
  children: ReactNode;
  initialEmail?: string; // Optional initial email
};

export const UserProvider = ({ children, initialEmail = 'tbd' }: UserProviderProps) => {
    const [userEmail, setUserEmail] = useState<string>(initialEmail);
  
    return (
      <UserContext.Provider value={{ userEmail, setUserEmail }}>
        {children}
      </UserContext.Provider>
    );
  };

// Custom hook to use the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};


/* 

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface UserContextType {
    email: string;
    setEmail: (email: string) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

 // Create a provider component
interface UserProviderProps {
    children: ReactNode;
} 

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [email, setEmail] = useState<string>('');

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}; 

*/