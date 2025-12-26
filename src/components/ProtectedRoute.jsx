import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #ffeef8 0%, #e3d5ff 100%)',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#b395d3'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="loading-spinner" />
                    <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
