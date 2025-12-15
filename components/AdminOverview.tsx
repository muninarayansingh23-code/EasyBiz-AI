import React from 'react';
import { Users, FileText, CreditCard, TrendingUp, Activity } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const StatCard = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-black text-zinc-900">{value}</h3>
        <p className="text-xs text-zinc-400 mt-1 font-medium">{subtext}</p>
      </div>
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass} bg-opacity-10 text-opacity-100`}>
         <Icon size={20} className={colorClass.replace('bg-', 'text-').split(' ')[0]} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-2xl font-bold text-zinc-900">Welcome back, Boss.</h1>
            <p className="text-zinc-500">Here's what's happening across the platform today.</p>
        </div>

        {/* Global Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                label="Total Tenants" 
                value="12" 
                subtext="+2 this week"
                icon={Users} 
                colorClass="bg-purple-100 text-purple-600"
            />
            <StatCard 
                label="Leads Processed" 
                value="1,250" 
                subtext="This Month"
                icon={FileText} 
                colorClass="bg-blue-100 text-blue-600"
            />
            <StatCard 
                label="Monthly Revenue" 
                value="₹45,000" 
                subtext="MRR"
                icon={CreditCard} 
                colorClass="bg-green-100 text-green-600"
            />
        </div>

        {/* System Health / Logs Preview */}
        <div className="bg-zinc-900 text-zinc-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <Activity size={18} className="text-green-500" /> System Live Feed
                </h3>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded">Real-time</span>
            </div>
            <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-4">
                    <span className="text-zinc-500">10:42 AM</span>
                    <span>New Tenant "Skyline Realty" registered (Pro Plan).</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-zinc-500">10:30 AM</span>
                    <span className="text-yellow-500">Warning: High API latency detected in Mumbai region.</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-zinc-500">10:15 AM</span>
                    <span>Daily backup completed successfully (245MB).</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminOverview;