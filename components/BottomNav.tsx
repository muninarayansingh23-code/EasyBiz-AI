import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, List, Mic, Grid, Menu } from 'lucide-react';
import { NavItem } from '../types';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: 'Home', path: '/agent/dashboard', icon: LayoutDashboard },
    { label: 'Leads', path: '/agent/leads', icon: List },
    { label: 'Bolkar', path: '/agent/bolkar', icon: Mic },
    { label: 'Tools', path: '/agent/tools', icon: Grid },
    { label: 'More', path: '/agent/settings', icon: Menu },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-between px-2 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        // Special styling for Center Mic button (Floating)
        if (item.label === 'Bolkar') {
          return (
            <div key={item.path} className="relative w-1/5 flex justify-center">
              <button
                onClick={() => handleNavClick(item.path)}
                className="absolute -top-10"
              >
                <div className={`h-16 w-16 rounded-full flex items-center justify-center shadow-blue-200 shadow-xl transition-transform active:scale-95 ${
                  isActive 
                  ? 'bg-gradient-to-tr from-blue-600 to-blue-500 text-white ring-4 ring-blue-50' 
                  : 'bg-white text-blue-600 border border-slate-100 ring-4 ring-slate-50'
                }`}>
                  <Mic size={28} />
                </div>
              </button>
            </div>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className={`flex flex-col items-center justify-center w-1/5 h-full space-y-1 transition-colors active:bg-slate-50 ${
              isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;