import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Moon, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4 mt-6">
      {title}
    </h3>
  );

  const SettingItem = ({ icon: Icon, label, value, onClick }: any) => (
    <button 
      onClick={onClick}
      className="w-full bg-white p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <Icon size={18} />
        </div>
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-slate-400">{value}</span>}
        <ChevronRight size={16} className="text-slate-300" />
      </div>
    </button>
  );

  return (
    <div className="pb-8">
      <div className="bg-white p-6 border-b border-slate-200 mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account and preferences</p>
      </div>

      <SectionHeader title="Account" />
      <div className="bg-white border-y border-slate-200">
        <div className="p-4 flex items-center gap-4 border-b border-slate-50">
           <div className="h-14 w-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xl font-bold">
              {userProfile?.name?.charAt(0) || 'U'}
           </div>
           <div>
              <p className="font-bold text-slate-900">{userProfile?.name}</p>
              <p className="text-sm text-slate-500">{userProfile?.phoneNumber}</p>
           </div>
        </div>
        <SettingItem icon={User} label="Personal Details" />
        <SettingItem icon={Lock} label="Privacy & Security" />
      </div>

      <SectionHeader title="App Settings" />
      <div className="bg-white border-y border-slate-200">
        <SettingItem icon={Bell} label="Notifications" value="On" />
        <SettingItem icon={Moon} label="Dark Mode" value="Off" />
        <SettingItem icon={HelpCircle} label="Help & Support" />
      </div>

      <SectionHeader title="Danger Zone" />
      <div className="bg-white border-y border-slate-200">
        <button 
          onClick={handleSignOut}
          className="w-full p-4 flex items-center justify-center gap-2 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out of EazyBiz
        </button>
      </div>
      
      <p className="text-center text-xs text-slate-300 mt-8">Version 1.0.0 (Build 240)</p>
    </div>
  );
};

export default SettingsPage;