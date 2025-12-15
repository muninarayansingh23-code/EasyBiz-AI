import React from 'react';
import { 
  Users, TrendingUp, Clock, IndianRupee, ArrowUpRight, 
  ArrowDownRight, MoreHorizontal, MessageCircle, Eye 
} from 'lucide-react';

// Mock Data
const LIVE_ACTIVITY = [
    { id: 1, text: "Vikram viewed Lead #4502", time: "1m ago", type: 'view' },
    { id: 2, text: "New Lead from 'Diwali Ad'", time: "5m ago", type: 'lead' },
    { id: 3, text: "Priya sent WhatsApp to Lead #4501", time: "12m ago", type: 'msg' },
    { id: 4, text: "Rahul changed status to 'Visit Scheduled'", time: "15m ago", type: 'status' },
    { id: 5, text: "Lead #3320 clicked your ad link", time: "22m ago", type: 'lead' },
];

const AGENTS = [
    { id: 1, name: "Vikram Singh", status: "online", leads: 12, msgs: 45, conversion: 5.2 },
    { id: 2, name: "Priya Verma", status: "online", leads: 8, msgs: 32, conversion: 8.1 },
    { id: 3, name: "Rahul Deshmukh", status: "offline", leads: 15, msgs: 20, conversion: 2.4 },
];

const BusinessDashboard: React.FC = () => {
    
    const StatCard = ({ title, value, subtext, trend, trendUp, icon: Icon, colorClass }: any) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass} bg-opacity-10 text-opacity-100`}>
                    <Icon size={20} className={colorClass.replace('bg-', 'text-').split(' ')[0]} />
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-bold ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
                        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{title}</p>
                {subtext && <p className="text-xs text-slate-400 mt-0.5">{subtext}</p>}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            
            {/* 1. Morning Coffee Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Leads Today" 
                    value="24" 
                    trend="12% vs yest" 
                    trendUp={true} 
                    icon={TrendingUp} 
                    colorClass="bg-blue-100 text-blue-600" 
                />
                <StatCard 
                    title="Avg Response Time" 
                    value="4m 30s" 
                    subtext="Target: < 5m"
                    icon={Clock} 
                    colorClass="bg-green-100 text-green-600" 
                />
                <StatCard 
                    title="Ad Spend Today" 
                    value="₹850" 
                    subtext="CPL: ₹35.40"
                    icon={IndianRupee} 
                    colorClass="bg-indigo-100 text-indigo-600" 
                />
                <StatCard 
                    title="Active Agents" 
                    value="3/5" 
                    subtext="2 Offline"
                    icon={Users} 
                    colorClass="bg-amber-100 text-amber-600" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2. Agent Performance Table (2/3 Width) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Agent Performance</h3>
                        <button className="text-sm text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                            Manage Team
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-5 py-3">Agent Name</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-center">Leads</th>
                                    <th className="px-5 py-3 text-center">Msgs Sent</th>
                                    <th className="px-5 py-3 text-center">Conv. %</th>
                                    <th className="px-5 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {AGENTS.map((agent) => (
                                    <tr key={agent.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            {agent.name}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                agent.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                                {agent.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center text-slate-600 font-mono">
                                            {agent.leads}
                                        </td>
                                        <td className="px-5 py-4 text-center text-slate-600 font-mono">
                                            {agent.msgs}
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`font-bold ${agent.conversion > 5 ? 'text-green-600' : 'text-amber-600'}`}>
                                                {agent.conversion}%
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex justify-center">
                        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                            View Full Report
                        </button>
                    </div>
                </div>

                {/* 3. Live Feed Widget (1/3 Width) */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                    <div className="p-5 border-b border-slate-100 flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <h3 className="font-bold text-slate-800">Live Activity</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                        {LIVE_ACTIVITY.map((item) => (
                            <div key={item.id} className="flex gap-3 items-start animate-in slide-in-from-right-4 duration-500">
                                <div className={`flex-none h-8 w-8 rounded-full flex items-center justify-center mt-0.5 border ${
                                    item.type === 'msg' ? 'bg-green-50 border-green-100 text-green-600' : 
                                    item.type === 'view' ? 'bg-blue-50 border-blue-100 text-blue-600' : 
                                    'bg-amber-50 border-amber-100 text-amber-600'
                                }`}>
                                    {item.type === 'msg' ? <MessageCircle size={14} /> : 
                                     item.type === 'view' ? <Eye size={14} /> : 
                                     <TrendingUp size={14} />}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-800 font-medium leading-tight">{item.text}</p>
                                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDashboard;