import React, { createContext, useReducer } from 'react'

const UserContext = createContext()

const initialState = {
    isLogin: false,
    user: []
}

const reducer = (state,action) => {
    const {type, payload} = action
    
    if(type === 'LOGIN_SUCCESS'){
        return {
            isLogin:true,
            user: payload
        }
    }else if(type === 'REGISTER_SUCCESS'){
        return {
            isLogin:true,
            user: payload
        }
    }else if(type === 'LOGOUT'){
        return {
            isLogin: false,
            user:[]
        }
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
