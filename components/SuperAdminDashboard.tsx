import React, { useState } from 'react';
import { MOCK_TENANTS } from '../lib/mockData';
import {
  MoreVertical, ExternalLink, Ban, Search, Filter
} from 'lucide-react';
import PlatformStats from './PlatformStats';

const SuperAdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const toggleMenu = (id: number) => setActiveMenu(activeMenu === id ? null : id);

  const handleAction = (action: string, name: string) => {
    setActiveMenu(null);
    if (action === 'login') {
      alert(`🔐 Logging in as Admin for ${name}...`);
    } else {
      alert(`🛑 Suspending ${name}...`);
    }
  }

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Healthy
                </span>
            </div>
        </div>

        {/* New Platform Stats Component */}
        <PlatformStats />

        {/* Tenant Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-lg">Tenant Management</h3>
                <div className="flex gap-2">
                     <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                        <Search size={18} />
                     </button>
                     <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                        <Filter size={18} />
                     </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Business Name</th>
                            <th className="px-6 py-4">Owner</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_TENANTS.map((tenant) => (
                            <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-900">{tenant.name}</td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900">{tenant.owner}</span>
                                        <span className="text-xs text-slate-400">{tenant.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                        tenant.plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                        tenant.plan === 'Pro' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                        'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}>
                                        {tenant.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${tenant.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className={`text-xs font-medium ${tenant.status === 'Active' ? 'text-green-700' : 'text-red-700'}`}>
                                            {tenant.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button 
                                        onClick={() => toggleMenu(tenant.id)}
                                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                    
                                    {activeMenu === tenant.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                                            <div className="absolute right-8 top-8 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-20 py-1 text-left animate-in fade-in zoom-in-95 duration-100">
                                                 <button 
                                                    onClick={() => handleAction('login', tenant.name)}
                                                    className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                >
                                                    <ExternalLink size={14} className="text-blue-600" /> Login as Admin
                                                </button>
                                                <button 
                                                    onClick={() => handleAction('suspend', tenant.name)}
                                                    className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                >
                                                    <Ban size={14} /> Suspend Tenant
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;