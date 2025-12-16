import React from 'react';
import { Users, Building2, TrendingUp } from 'lucide-react';
import { MOCK_ALL_USERS, MOCK_TENANTS, MOCK_GLOBAL_STATS } from '../lib/mockData';

const PlatformStats: React.FC = () => {
  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-2">
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color} bg-opacity-10 text-opacity-100 mb-2`}>
         <Icon size={24} className={color.replace('bg-', 'text-').split(' ')[0]} />
      </div>
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        label="Total Users" 
        value={MOCK_ALL_USERS.length} 
        icon={Users} 
        color="bg-blue-100 text-blue-600" 
      />
      <StatCard 
        label="Active Companies" 
        value={MOCK_TENANTS.filter(t => t.status === 'Active').length} 
        icon={Building2} 
        color="bg-purple-100 text-purple-600" 
      />
      <StatCard 
        label="Leads Generated" 
        value={MOCK_GLOBAL_STATS.totalLeads.toLocaleString()} 
        icon={TrendingUp} 
        color="bg-green-100 text-green-600" 
      />
    </div>
  );
};

export default PlatformStats;