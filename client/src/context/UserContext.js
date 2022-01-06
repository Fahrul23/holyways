import React, { createContext, useReducer } from 'react'

const UserContext = createContext()

const initialState = {
    isLogin: false,
    user: []
}

const reducer = (state,action) => {
    const {type, payload} = action
    
    switch (type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            localStorage.setItem("token", payload.user.token);
            return {
                isLogin: true,
                name: payload.user.fullName,
                email: payload.user.email,
            };
        
        case "USER_SUCCESS":
            localStorage.setItem("token", payload.token);
            return {
                isLogin: true,
                name: payload.fullName,
                email: payload.email,
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                isLogin: false,
                user: {},
            };
        default:
            throw new Error();
    }
}

const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={[state,dispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
