import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutGrid, Kanban, Rocket, Users, Settings, LogOut, 
  Menu, Bell, Wallet, Plus 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BusinessLayout: React.FC = () => {
    const { userProfile, logout } = useAuth();
    
    // Mock Wallet Balance
    const walletBalance = 5000;

    const navItems = [
        { label: 'Dashboard', path: '/app/dashboard', icon: LayoutGrid },
        { label: 'Pipeline', path: '/app/crm', icon: Kanban },
        { label: 'Growth Studio', path: '/app/growth', icon: Rocket },
        { label: 'Team', path: '/app/team', icon: Users },
        { label: 'Settings', path: '/app/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white flex-shrink-0 transition-all duration-300">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                        EB
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white leading-none">EazyBiz</h2>
                        <p className="text-xs text-slate-400 mt-1">Tenant Admin</p>
                    </div>
                </div>
                
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.path}
                            to={item.path} 
                            className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                     <div className="bg-slate-800 rounded-xl p-4 mb-4">
                        <p className="text-xs text-slate-400 mb-1">Current Plan</p>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-white">Pro Plan</span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Active</span>
                        </div>
                    </div>
                    <button onClick={logout} className="flex items-center gap-3 px-2 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors w-full">
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-slate-500">
                            <Menu size={24} />
                        </button>
                        <div>
                             <h1 className="text-xl font-bold text-slate-800 hidden md:block">
                                Good Morning, {userProfile?.name?.split(' ')[0] || 'Partner'} ☀️
                             </h1>
                             <h1 className="text-lg font-bold text-slate-800 md:hidden">Dashboard</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Wallet Widget */}
                        <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Wallet Balance</span>
                                <span className="text-sm font-bold text-slate-900">₹{walletBalance.toLocaleString()}</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200 mx-1"></div>
                            <button className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors shadow-sm active:scale-95" title="Add Funds">
                                <Plus size={16} />
                            </button>
                        </div>

                        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        
                        <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer">
                            {userProfile?.name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BusinessLayout;