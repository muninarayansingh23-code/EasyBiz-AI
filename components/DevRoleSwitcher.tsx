import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Briefcase, User, Wrench, X, RefreshCw } from 'lucide-react';
import { UserRole } from '../types';

const DevRoleSwitcher: React.FC = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Only show if user is logged in
  if (!user) return null;

  const handleSwitch = async (role: UserRole) => {
    if (!user) return;
    setLoading(true);
    try {
      // Create a dummy profile update to force the role change in DB/Context
      // This persists across reloads because it writes to Firestore
      await updateProfile({
        uid: user.uid,
        phoneNumber: user.phoneNumber || '',
        role: role,
        name: userProfile?.name || 'Dev User',
        is_active: true,
        tenantId: userProfile?.tenantId || 'dev_tenant',
        // Mock permissions based on role to ensure UI renders correctly
        permissions: role === 'business_owner' ? {
            can_create_ads: true,
            can_manage_team: true,
            can_view_leads: true,
            can_view_roi: true,
            can_access_site: true
        } : role === 'super_admin' ? {
            can_create_ads: true,
            can_manage_team: true,
            can_view_leads: true,
            can_view_roi: true,
            can_access_site: true
        } : {
             can_create_ads: false,
             can_manage_team: false,
             can_view_leads: true,
             can_view_roi: false,
             can_access_site: true
        }
      });
      
      // Force reload to ensure all guards and layouts re-evaluate
      // FIX: Do not reload for dev user as session is in-memory and will be lost
      if (!user.uid.startsWith('dev_')) {
          window.location.reload();
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to switch role", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] h-12 w-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform opacity-50 hover:opacity-100"
        title="Dev Tools"
      >
        <Wrench size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Wrench size={18} />
            <h3 className="font-bold">Dev Role Switcher</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
             <p className="text-xs text-slate-500 mb-1">Current User</p>
             <p className="font-mono text-xs text-slate-900 break-all">{user.uid}</p>
             <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">Role</span>
                <span className="font-bold uppercase text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded">{userProfile?.role || 'None'}</span>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => handleSwitch('super_admin')}
              disabled={loading}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors text-sm font-medium"
            >
              <Shield size={16} /> Switch to Super Admin
            </button>
            <button 
               onClick={() => handleSwitch('business_owner')}
               disabled={loading}
               className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors text-sm font-medium"
            >
              <Briefcase size={16} /> Switch to Business Owner
            </button>
            <button 
               onClick={() => handleSwitch('agent')}
               disabled={loading}
               className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors text-sm font-medium"
            >
              <User size={16} /> Switch to Agent
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4">
             <button 
                onClick={() => window.location.reload()}
                className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
             >
                <RefreshCw size={14} /> Force Reload App
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevRoleSwitcher;