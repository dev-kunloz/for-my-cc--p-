/**
 * MERN Auth SSO - Frontend Integration SDK
 * 
 * Use this in your React/Vue/Angular apps to handle authentication
 * with the central MERN Auth system.
 */

const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_URL || 'https://central-auth-x5z8.onrender.com/api';

/**
 * AuthClient - Main client for frontend apps
 */
class AuthClient {
    constructor(authServerUrl = AUTH_SERVER_URL) {
        this.authServerUrl = authServerUrl;
        this.tokenKey = 'auth_token';
        this.userKey = 'auth_user';
    }

    /**
     * Get stored token
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Get stored user
     */
    getUser() {
        const userJson = localStorage.getItem(this.userKey);
        return userJson ? JSON.parse(userJson) : null;
    }

    /**
     * Store token and user
     */
    setAuth(token, user) {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    /**
     * Clear auth data
     */
    clearAuth() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Login with email/password
     */
    async login(email, password) {
        try {
            const response = await fetch(`${this.authServerUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            this.setAuth(data.token, data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Register new user
     */
    async register(displayName, email, password) {
        try {
            const response = await fetch(`${this.authServerUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ displayName, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            this.setAuth(data.token, data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Verify current token
     */
    async verifyToken() {
        const token = this.getToken();
        if (!token) return { valid: false };

        try {
            const response = await fetch(`${this.authServerUrl}/auth/verify-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                this.clearAuth();
                return { valid: false };
            }

            const data = await response.json();
            return { valid: true, user: data.user };
        } catch (error) {
            this.clearAuth();
            return { valid: false };
        }
    }

    /**
     * Logout
     */
    logout() {
        this.clearAuth();
    }

    /**
     * Get authorization header for API requests
     */
    getAuthHeader() {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    /**
     * Make authenticated API request
     */
    async fetch(url, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...this.getAuthHeader(),
            ...options.headers
        };

        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            this.clearAuth();
            window.location.href = '/login';
        }

        return response;
    }
}

// Export singleton instance
export const authClient = new AuthClient();
export default AuthClient;
