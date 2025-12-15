import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Briefcase, User, Wrench, X } from 'lucide-react';
import { UserRole } from '../types';

const DevRoleSwitcher: React.FC = () => {
    const { user, login, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleSwitch = async (role: UserRole) => {
        // 1. Ensure User is Logged In (Mock)
        if (!user) {
            await login('+919999999999');
        }

        // 2. Define Mock Profile based on Role
        let mockProfile: any = {
            uid: user?.uid || 'dev_user_uid',
            phoneNumber: '+919999999999',
            is_active: true,
            createdAt: new Date().toISOString(),
            role: role
        };

        let targetPath = '/';

        switch (role) {
            case 'super_admin':
                mockProfile.name = 'Dev Super Admin';
                targetPath = '/platform/overview';
                break;
            case 'business_owner':
                mockProfile.name = 'Dev Business Owner';
                mockProfile.tenantId = 'dev_tenant_01';
                targetPath = '/app/dashboard';
                break;
            case 'agent':
                mockProfile.name = 'Dev Agent';
                mockProfile.tenantId = 'dev_tenant_01';
                targetPath = '/agent/dashboard';
                break;
        }

        // 3. Update Context & Navigate
        updateProfile(mockProfile);
        navigate(targetPath);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-2 flex flex-col gap-1 w-56 mb-2 animate-in slide-in-from-bottom-5 duration-200">
                    <div className="px-3 py-2 border-b border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dev Switcher</span>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={14} />
                        </button>
                    </div>
                    
                    <button 
                        onClick={() => handleSwitch('super_admin')}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-purple-50 text-left group transition-colors"
                    >
                        <div className="h-8 w-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Shield size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">Super Admin</p>
                            <p className="text-[10px] text-slate-400">/platform</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleSwitch('business_owner')}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-50 text-left group transition-colors"
                    >
                        <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Briefcase size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">Business Owner</p>
                            <p className="text-[10px] text-slate-400">/app</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleSwitch('agent')}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-green-50 text-left group transition-colors"
                    >
                         <div className="h-8 w-8 rounded-md bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <User size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">Agent</p>
                            <p className="text-[10px] text-slate-400">/agent</p>
                        </div>
                    </button>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-slate-800 transition-transform active:scale-95 border-2 border-slate-700"
                title="Developer Tools"
            >
                <Wrench size={20} />
            </button>
        </div>
    );
};

export default DevRoleSwitcher;