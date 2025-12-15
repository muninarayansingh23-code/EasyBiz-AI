import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, Shield, Power, RotateCcw, 
  ExternalLink, Building2, User 
} from 'lucide-react';

const MOCK_TENANTS = [
  { id: 1, name: "Skyline Realty", owner: "Rajesh Kumar", phone: "+91 9876543210", plan: "Pro", status: "Active", leads: 145 },
  { id: 2, name: "Dream Homes", owner: "Suresh Singh", phone: "+91 9876543211", plan: "Enterprise", status: "Active", leads: 320 },
  { id: 3, name: "City Constructions", owner: "Anil Gupta", phone: "+91 9876543212", plan: "Free", status: "Suspended", leads: 12 },
  { id: 4, name: "Urban Spaces", owner: "Priya Menon", phone: "+91 9876543213", plan: "Pro", status: "Active", leads: 88 },
  { id: 5, name: "Metro Builders", owner: "Vikram Malhotra", phone: "+91 9876543214", plan: "Free", status: "Active", leads: 45 },
];

const TenantManagement: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleAction = (action: string, tenantName: string) => {
    setActiveMenu(null);
    if (action === 'impersonate') {
      alert(`🔐 Logging in as Admin for ${tenantName}...\n(In production, this would switch auth tokens)`);
    } else {
      alert(`${action} action triggered for ${tenantName}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Tenant Management</h1>
          <p className="text-zinc-500 text-sm">Manage business accounts and subscriptions.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-purple-200 transition-colors flex items-center gap-2">
           <Building2 size={16} /> Add New Tenant
        </button>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-visible">
        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-200 flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search business or owner..." 
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <button className="px-3 py-2 border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 text-sm font-medium flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3">Business Name</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Usage (Leads)</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {MOCK_TENANTS.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-zinc-900">{tenant.name}</div>
                    <div className="text-xs text-zinc-400">ID: #{1000 + tenant.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                            <User size={12} />
                        </div>
                        <div>
                            <div className="font-medium text-zinc-700">{tenant.owner}</div>
                            <div className="text-xs text-zinc-400 font-mono">{tenant.phone}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${
                        tenant.plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        tenant.plan === 'Pro' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-zinc-100 text-zinc-600 border-zinc-200'
                    }`}>
                        {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 font-mono">
                    {tenant.leads}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tenant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${tenant.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                        onClick={() => toggleMenu(tenant.id)}
                        className="p-1.5 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                        <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === tenant.id && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                            <div className="absolute right-8 top-8 w-48 bg-white rounded-lg shadow-xl border border-zinc-100 z-20 py-1 text-left animate-in fade-in zoom-in-95 duration-100">
                                <button 
                                    onClick={() => handleAction('impersonate', tenant.name)}
                                    className="w-full px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                                >
                                    <ExternalLink size={14} className="text-purple-600" /> Login as Admin
                                </button>
                                <button 
                                    onClick={() => handleAction('reset_password', tenant.name)}
                                    className="w-full px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                                >
                                    <RotateCcw size={14} /> Reset Password
                                </button>
                                <div className="h-px bg-zinc-100 my-1" />
                                <button 
                                    onClick={() => handleAction('suspend', tenant.name)}
                                    className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                                >
                                    <Power size={14} /> Suspend Account
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
        <div className="p-4 border-t border-zinc-200 bg-zinc-50 rounded-b-xl flex justify-between items-center text-xs text-zinc-500">
            <span>Showing 1-5 of 12 tenants</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-zinc-200 rounded hover:bg-zinc-50 disabled:opacity-50">Previous</button>
                <button className="px-3 py-1 bg-white border border-zinc-200 rounded hover:bg-zinc-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManagement;