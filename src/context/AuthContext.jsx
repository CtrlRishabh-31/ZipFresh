import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authService } from '../services/authService';
import { useUI } from './UIContext';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useLocalStorage('zipfresh_auth_token_v3', null);
    const { addToast } = useUI();

    // Restore session
    useEffect(() => {
        const restoreSession = async () => {
            if (token) {
                // In a real app, we'd verify token with backend.
                // Here we just try to find the user in local "DB" or restore stored user state if we persisted it.
                // For better security in this mock, let's just assume if we have a token, we parse the stored user.
                const storedUser = localStorage.getItem('zipfresh_current_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setToken(null);
                }
            }
            setLoading(false);
        };
        restoreSession();
    }, []);

    const persistLogin = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('zipfresh_current_user', JSON.stringify(userData));
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authService.login(email, password);
            persistLogin(response.user, response.token);
            addToast(`Welcome back, ${response.user.name}!`);
            return { success: true };
        } catch (error) {
            addToast(error.message, 'error');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData) => {
        setLoading(true);
        try {
            const response = await authService.signup(userData);
            persistLogin(response.user, response.token);
            addToast('Account created successfully!');
            return { success: true };
        } catch (error) {
            addToast(error.message, 'error');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('zipfresh_current_user');
        addToast('Logged out successfully');
    };

    const updateUserProfile = async (updates) => {
        try {
            if (!user) return;
            const updatedUser = await authService.updateUser(user.id, updates);
            setUser(updatedUser);
            localStorage.setItem('zipfresh_current_user', JSON.stringify(updatedUser));
            addToast("Profile updated");
            return { success: true };
        } catch (error) {
            addToast("Failed to update profile", "error");
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            loading,
            login,
            signup,
            logout,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}
