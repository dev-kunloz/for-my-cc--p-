import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './LoginPage.css';

const LoginPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = () => {
        // Redirect to central auth frontend with return URL
        const returnUrl = encodeURIComponent(window.location.origin + '/callback');
        window.location.href = `https://central-auth-rust.vercel.app/login?return=${returnUrl}`;
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="floating-heart" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>💕</div>
                <div className="floating-heart" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>🌸</div>
                <div className="floating-heart" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>✨</div>
                <div className="floating-heart" style={{ bottom: '25%', right: '10%', animationDelay: '6s' }}>💜</div>
            </div>

            <motion.div
                className="login-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="login-title">
                        Welcome Back 💕
                    </h1>
                    <p className="login-subtitle">
                        Login to access your comfort page
                    </p>
                </motion.div>

                <motion.button
                    className="login-button"
                    onClick={handleLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Login with Central Auth 🔐
                </motion.button>

                <motion.div
                    className="login-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>
                        Don't have an account?{' '}
                        <a
                            href="https://central-auth-rust.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sign up here
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
