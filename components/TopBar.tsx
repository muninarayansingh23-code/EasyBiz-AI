import React, { useState } from 'react';
import { Wifi, WifiOff, LogOut, User, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  isOffline: boolean;
  toggleOffline: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ isOffline, toggleOffline }) => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex-none h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50 relative">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">EB</span>
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">EazyBiz</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Network Status Toggle (Mock) */}
        <button 
          onClick={toggleOffline}
          className={`flex items-center justify-center h-8 w-8 rounded-full transition-all ${
            isOffline 
              ? 'bg-amber-100 text-amber-600' 
              : 'bg-green-100 text-green-600'
          }`}
        >
          {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
        </button>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold focus:ring-2 focus:ring-blue-200 transition-all"
          >
            {userProfile?.name ? userProfile.name.charAt(0) : 'U'}
          </button>

          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsMenuOpen(false)} 
              />
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-50 bg-slate-50">
                  <p className="text-sm font-bold text-slate-900 truncate">{userProfile?.name || 'Agent'}</p>
                  <p className="text-xs text-slate-500 truncate">{userProfile?.role}</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <User size={16} /> Profile
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Crown size={16} className="text-amber-500" /> Subscription
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;