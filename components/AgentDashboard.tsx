import React from 'react';
import { MOCK_LEADS } from '../lib/mockData';
import { ArrowUpRight, Calendar, Users, Target } from 'lucide-react';

const AgentDashboard: React.FC = () => {
  const newLeadsCount = MOCK_LEADS.filter(l => l.status === 'New').length;
  
  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start gap-3">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-xl font-bold text-slate-900">Good Morning, Agent</h1>
           <p className="text-sm text-slate-500">Here's your growth activity today.</p>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-200">
            <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard 
            label="New Leads" 
            value={newLeadsCount} 
            icon={Users} 
            color="bg-green-100 text-green-600" 
        />
        <StatCard 
            label="Visits" 
            value="3" 
            icon={Calendar} 
            color="bg-blue-100 text-blue-600" 
        />
        <StatCard 
            label="Follow-ups" 
            value="12" 
            icon={Target} 
            color="bg-amber-100 text-amber-600" 
        />
         <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between text-white">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Sales Goal</p>
            <p className="text-xl font-bold">₹1.2Cr <span className="text-xs font-normal text-slate-400">/ ₹5Cr</span></p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full w-[24%]"></div>
            </div>
         </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Today's Priority</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            {MOCK_LEADS.slice(0, 2).map((lead, idx) => (
                <div key={lead.id} className={`flex items-center justify-between ${idx !== 0 ? 'mt-4 pt-4 border-t border-slate-100' : ''}`}>
                    <div>
                        <p className="font-semibold text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.status} • {lead.timestamp}</p>
                    </div>
                    <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                        Call Now
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;