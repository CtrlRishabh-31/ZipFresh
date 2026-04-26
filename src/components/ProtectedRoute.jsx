import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Skeleton from './Skeleton';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Skeleton className="w-12 h-12 rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login page, but save the tried location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
