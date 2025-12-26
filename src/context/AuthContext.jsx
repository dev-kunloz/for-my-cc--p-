import { createContext, useContext, useState, useEffect } from 'react';
import { authClient } from '../utils/authClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing token on mount
    useEffect(() => {
        const initAuth = async () => {
            const storedUser = authClient.getUser();
            const storedToken = authClient.getToken();

            if (storedToken && storedUser) {
                // Verify token is still valid
                const result = await authClient.verifyToken();
                if (result.valid) {
                    setUser(result.user);
                } else {
                    authClient.clearAuth();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    // Login with email/password
    const login = async (email, password) => {
        try {
            setError(null);
            const result = await authClient.login(email, password);

            if (result.success) {
                setUser(result.user);
                return { success: true };
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Logout
    const logout = () => {
        authClient.logout();
        setUser(null);
    };

    const value = {
        user,
        setUser, // Expose setUser for manual updates (e.g. from CallbackPage)
        loading,
        error,
        login,
        logout,
        setError,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
