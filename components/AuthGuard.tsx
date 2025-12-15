import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // 1. Unauthenticated -> Login
    if (!user) {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
      return;
    }

    // 2. No Profile -> Onboarding
    // Allow access to onboarding if they have no profile, but prevent loop if already there
    if (!userProfile) {
      if (location.pathname !== '/onboarding') {
        navigate('/onboarding');
      }
      return;
    }

    // 3. Has Profile -> Traffic Cop Logic
    // If user tries to access login, onboarding, or root while having a profile, redirect them
    if (location.pathname === '/login' || location.pathname === '/onboarding' || location.pathname === '/') {
        redirectUserBasedOnRole(userProfile.role);
        return;
    }

    // 4. Role Protection
    if (allowedRoles && !allowedRoles.includes(userProfile.role || '')) {
      // Unauthorized access attempt, redirect to their home
      redirectUserBasedOnRole(userProfile.role);
    }

  }, [user, userProfile, loading, navigate, location.pathname, allowedRoles]);

  const redirectUserBasedOnRole = (role: string | null) => {
    switch (role) {
      case 'super_admin':
        navigate('/platform/overview');
        break;
      case 'business_owner':
        navigate('/app/dashboard');
        break;
      case 'agent':
        navigate('/agent/bolkar');
        break;
      default:
        navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center animate-pulse mb-4">
          <span className="text-white font-bold text-2xl">EB</span>
        </div>
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;