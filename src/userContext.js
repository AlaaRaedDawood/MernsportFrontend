import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const ContextWrapper = (props) => {

    const defaultValueHandler = () => {
        return localStorage.getItem('userID') ? true : false ;
    }

    const [isLoggedIn, setIsloggedIn] = useState(defaultValueHandler);
    const user = {
        isLoggedIn,
        setIsloggedIn
    }
    
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}
