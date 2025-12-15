import React, { useState } from 'react';
import { MOCK_AGENTS } from '../lib/mockData';
import { 
  Plus, Search, MoreVertical, Phone, Mail, MapPin, 
  TrendingUp, Award, X, User 
} from 'lucide-react';

const TeamManagement: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
          <p className="text-sm text-slate-500">Manage your sales force and permissions.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-200 transition-colors flex items-center gap-2">
          <Plus size={18} /> Add New Agent
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
             <span className="font-bold text-slate-900">{MOCK_AGENTS.length}</span> Active Members
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-hidden flex-1 overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Agent Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Active Leads</th>
              <th className="px-6 py-4 text-center">Conversion</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_AGENTS.map((agent) => (
              <tr 
                key={agent.id} 
                onClick={() => setSelectedAgent(agent)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{agent.name}</p>
                      <p className="text-xs text-slate-400">ID: AG-{100 + agent.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                    agent.status === 'online' 
                      ? 'bg-green-50 text-green-700 border-green-100' 
                      : 'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  Sales Executive
                </td>
                <td className="px-6 py-4 text-center font-mono font-medium text-slate-700">
                  {agent.leads}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 font-bold text-slate-700">
                    <TrendingUp size={14} className="text-green-500" />
                    {agent.conversion}%
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agent Details Drawer */}
      {selectedAgent && (
        <>
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] z-20 transition-opacity"
            onClick={() => setSelectedAgent(null)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-96 bg-white shadow-2xl z-30 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-slate-700">
                  {selectedAgent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedAgent.name}</h2>
                  <p className="text-sm text-slate-500">Sales Executive</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                   <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Total Leads</p>
                   <p className="text-2xl font-black text-slate-900">{selectedAgent.leads}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                   <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Conversion</p>
                   <p className="text-2xl font-black text-slate-900">{selectedAgent.conversion}%</p>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Contact Details</h3>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                        <Phone size={16} />
                      </div>
                      +91 98765 43210
                   </div>
                   <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                        <Mail size={16} />
                      </div>
                      {selectedAgent.name.toLowerCase().replace(' ', '.')}@eazybiz.com
                   </div>
                   <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                        <MapPin size={16} />
                      </div>
                      Mumbai, MH
                   </div>
                </div>
              </div>

              {/* Performance / Awards */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Achievements</h3>
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <Award className="text-amber-600" size={24} />
                    <div>
                        <p className="text-sm font-bold text-slate-900">Top Performer</p>
                        <p className="text-xs text-slate-500">March 2024</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-colors">
                 View Full Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamManagement;