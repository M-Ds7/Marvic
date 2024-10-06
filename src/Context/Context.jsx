import { useEffect, useState, createContext } from "react";

export const MarvicContext = createContext();

export const MarvicProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [isUser, setIsUser] = useState(!!localStorage.getItem('token') && !!localStorage.getItem('userId'));
    const [adminId, setAdminId] = useState(() => localStorage.getItem('adminId') || '');
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
    const [role, setRole] = useState(() => localStorage.getItem('role') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId');
        }
    }, [userId]);

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');
        }
    }, [role]);

    useEffect(() => {
        if (adminId) {
            localStorage.setItem('adminId', adminId);
        } else {
            localStorage.removeItem('adminId');
        }
    }, [adminId]);

    const login = (tokenValue, userIdValue, roleValue, adminIdValue) => {
        setToken(tokenValue);
        setIsUser(true);
        setRole(roleValue);
        setUserId(userIdValue)
        setAdminId(adminIdValue)
    };

    const logout = () => {
        setToken('');
        setIsUser(false);
        setUserId('');
        setRole('');
        setAdminId('');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('adminId');
    };

    return (
        <MarvicContext.Provider value={{
            token,
            setToken,
            isUser,
            userId,
            adminId,
            role,
            logout,
            login
        }}>
            {children}
        </MarvicContext.Provider>
    );
};
