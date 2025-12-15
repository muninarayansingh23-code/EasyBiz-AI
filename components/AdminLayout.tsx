import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutGrid, Building, CreditCard, ScrollText, 
  Settings, LogOut, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    
    const navItems = [
        { label: 'Overview', path: '/platform/overview', icon: LayoutGrid },
        { label: 'Tenants', path: '/platform/tenants', icon: Building },
        { label: 'Subscriptions', path: '/platform/subscriptions', icon: CreditCard },
        { label: 'System Logs', path: '/platform/logs', icon: ScrollText },
        { label: 'Global Config', path: '/platform/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
            {/* Enterprise Sidebar */}
            <aside className="w-64 bg-[#1a0b2e] text-white flex flex-col flex-shrink-0 transition-all duration-300">
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <ShieldCheck size={18} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold tracking-wider uppercase text-purple-200">Super Admin</h2>
                        <p className="text-xs text-zinc-400">Platform Control</p>
                    </div>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.path}
                            to={item.path} 
                            className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                                isActive 
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
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
                        className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shadow-sm">
                    <h1 className="text-lg font-bold text-zinc-800">Platform Overview</h1>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-xs font-bold text-purple-700">
                            v2.4.0 Stable
                        </div>
                        <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            SA
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;