import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, User, ChevronRight } from 'lucide-react';
import SetupOwnerScreen from './SetupOwnerScreen';
import WelcomeStaffScreen from './WelcomeStaffScreen';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, userStatus, userProfile, updateProfile } = useAuth();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<'business_owner' | 'agent' | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-detect role for INVITED users
  useEffect(() => {
    if (userStatus === 'INVITED' && userProfile?.role === 'agent') {
      setRole('agent');
      setStep(2);
    }
  }, [userStatus, userProfile]);

  // STEP 1: Role Selection Screen (Kept inline as it's a simple router)
  const renderRoleSelection = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Choose your Role</h1>
          <p className="text-slate-500 mb-8">How will you be using EazyBiz?</p>
          
          <div className="space-y-4">
            <button
              onClick={() => { setRole('business_owner'); setStep(2); }}
              className="w-full flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group text-left"
            >
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Building2 size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">Business Owner</h3>
                <p className="text-xs text-slate-500 mt-1">Setup workspace & manage team</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-blue-500" />
            </button>

            <button
              onClick={() => { setRole('agent'); setStep(2); }}
              className="w-full flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all group text-left"
            >
              <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">Staff / Agent</h3>
                <p className="text-xs text-slate-500 mt-1">Join an existing team</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-green-500" />
            </button>
          </div>
       </div>
    </div>
  );

  const handleOwnerComplete = async (data: any) => {
    if (!user) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API
      await updateProfile({
        uid: user.uid,
        phoneNumber: user.phoneNumber || '',
        role: 'business_owner',
        tenantId: `biz_${Date.now()}`,
        name: data.name,
        is_active: true,
        createdAt: new Date().toISOString()
      });
      navigate('/app/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStaffJoin = async (name: string) => {
    if (!user) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API
      await updateProfile({
        uid: user.uid,
        phoneNumber: user.phoneNumber || '',
        role: 'agent',
        tenantId: userProfile?.tenantId || 'TEAM123',
        name: name,
        is_active: true,
        createdAt: new Date().toISOString()
      });
      navigate('/agent/bolkar');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) return renderRoleSelection();

  if (role === 'business_owner') {
    return <SetupOwnerScreen onComplete={handleOwnerComplete} isLoading={loading} />;
  }

  return <WelcomeStaffScreen onJoin={handleStaffJoin} isLoading={loading} tenantName="EazyBiz Demo Team" />;
};

export default Onboarding;