import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authClient } from '../utils/authClient';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './CallbackPage.css';

const CallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { setUser } = useAuth(); // Get setUser from context

    useEffect(() => {
        const handleCallback = async () => {
            // Get token from URL params
            const token = searchParams.get('token');
            const userJson = searchParams.get('user');

            if (token && userJson) {
                try {
                    // Parse user data
                    const user = JSON.parse(decodeURIComponent(userJson));

                    // Store auth data in localStorage
                    authClient.setAuth(token, user);

                    // UPDATE CONTEXT STATE IMMEDIATELY
                    setUser(user);

                    // Redirect to home
                    navigate('/', { replace: true });
                } catch (err) {
                    console.error('Callback error:', err);
                    setError('Failed to process authentication. Please try again.');
                }
            } else {
                setError('Missing authentication data. Please login again.');
            }
        };

        handleCallback();
    }, [searchParams, navigate, setUser]);

    if (error) {
        return (
            <div className="callback-container">
                <div className="callback-error">
                    <h2>Authentication Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/login')}>
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="callback-container">
            <div className="callback-loading">
                <div className="loading-spinner" />
                <p>Completing login... 💕</p>
            </div>
        </div>
    );
};

export default CallbackPage;
