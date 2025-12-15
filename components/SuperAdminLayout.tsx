import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, CreditCard, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SuperAdminLayout: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/platform/overview', icon: LayoutDashboard },
    { label: 'Tenants', path: '/platform/tenants', icon: Building2 },
    { label: 'Subscriptions', path: '/platform/subscriptions', icon: CreditCard },
    { label: 'System Logs', path: '/platform/logs', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1b4b] text-white flex flex-col flex-shrink-0 transition-all">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
            SA
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase">Platform</h2>
            <p className="text-xs text-indigo-200 opacity-70">Super Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
           <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 text-sm text-indigo-300 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;