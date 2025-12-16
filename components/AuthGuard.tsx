import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { user, userProfile, userStatus, loading } = useAuth();
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

    // 2. Routing Logic Fork based on Status
    
    // Status: NEW_USER or INVITED -> Must go to Onboarding
    if (userStatus === 'NEW_USER' || userStatus === 'INVITED') {
      if (location.pathname !== '/onboarding') {
        navigate('/onboarding');
      }
      return;
    }

    // Status: ACTIVE -> Traffic Cop Logic
    if (userStatus === 'ACTIVE') {
       // Prevent access to login/onboarding if active
       if (location.pathname === '/login' || location.pathname === '/onboarding' || location.pathname === '/') {
           redirectUserBasedOnRole(userProfile?.role);
           return;
       }
       
       // Role Protection
       if (allowedRoles && userProfile) {
         if (!allowedRoles.includes(userProfile.role || '')) {
           redirectUserBasedOnRole(userProfile.role);
         }
       }
    }

  }, [user, userProfile, userStatus, loading, navigate, location.pathname, allowedRoles]);

  const redirectUserBasedOnRole = (role: string | null | undefined) => {
    switch (role) {
      case 'super_admin':
        navigate('/platform/overview');
        break;
      case 'business_owner':
        navigate('/app/dashboard');
        break;
      case 'agent':
        navigate('/agent/bolkar'); // Agents land on Bolkar/Mic
        break;
      default:
        navigate('/app/dashboard');
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