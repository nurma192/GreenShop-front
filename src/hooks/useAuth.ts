import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [token, setToken] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setToken('');
        navigate('/login')
    }


    return {
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }
}