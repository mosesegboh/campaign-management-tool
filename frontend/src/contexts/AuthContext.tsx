import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { User, Advertiser, AuthContextProps } from '../types';

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    advertiser: null,
    token: null,
    register: async () => {},
    login: async () => {},
    logout: async () => {},
    fetchProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));

    const register = useCallback(
        async (data: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => {
            const response = await api.post('/register', data);
            const { token, user, advertiser } = response.data;
            localStorage.setItem('auth_token', token);
            setToken(token);
            setUser(user);
            setAdvertiser(advertiser);
            await fetchProfile();
        },
        []
    );

    const login = useCallback(async (data: { email: string; password: string }) => {
        const response = await api.post('/login', data);
        const { token, user } = response.data;
        localStorage.setItem('auth_token', token);
        setToken(token);
        setUser(user);
        await fetchProfile();
    }, []);

    const logout = useCallback(async () => {
        await api.post('/logout');
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
        setAdvertiser(null);
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!token) return;
        const response = await api.get('/profile');
        const { user, advertiser } = response.data;
        setUser(user);
        setAdvertiser(advertiser);
    }, [token]);

    useEffect(() => {
        if (token && !user) {
            fetchProfile().catch(console.error);
        }
    }, [token, user, fetchProfile]);

    return (
        <AuthContext.Provider
            value={{
                user,
                advertiser,
                token,
                register,
                login,
                logout,
                fetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
