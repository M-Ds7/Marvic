import { useState } from "react";
import { createContext } from "react";

export const MarvicContext = createContext();

export const MarvicProvider = ({ children }) => {
    const [ token, setToken ] = useState('');
    const [ isUser, setIsUser ] = useState(false);
    const [ userId, setUserId ] = useState('');

    const login = (useridValue) => {
        setIsUser(true)
        setUserId(useridValue)
    }

    const logout = () =>{
        setToken('')
        setIsUser(false)
        setUserId('')
    }
    
    return(
        <MarvicContext.Provider value={{
            token,
            setToken,
            isUser,
            userId,
            logout,
            login
        }}>
            { children }
        </MarvicContext.Provider>
    )
}