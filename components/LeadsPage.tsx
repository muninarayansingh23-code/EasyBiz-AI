import React, { useState } from 'react';
import { MOCK_LEADS } from '../lib/mockData';
import LeadCard from './LeadCard';
import { Search, Filter, X, Zap } from 'lucide-react';

const LeadsPage: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Heads Up Banner */}
        {showBanner && (
            <div className="bg-amber-100 border-b border-amber-200 px-4 py-3 flex items-start justify-between animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-start gap-3">
                    <div className="bg-amber-200 p-1.5 rounded-full mt-0.5">
                        <Zap size={14} className="text-amber-700" fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-amber-900">🔥 New Lead Alert</p>
                        <p className="text-xs text-amber-800 mt-0.5">Rohit just enquired! Tap to Reply now.</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowBanner(false)}
                    className="text-amber-700 hover:bg-amber-200 rounded-full p-1 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        )}

      <div className="px-4 pt-4 sticky top-0 bg-slate-50 z-10 pb-2">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-4">
            <div>
                 <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
                 <p className="text-xs text-slate-500 font-medium">Manage your pipeline</p>
            </div>
          
          <div className="flex gap-2">
            <button className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50 active:scale-95 transition-all">
              <Search size={20} />
            </button>
            <button className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50 active:scale-95 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Tabs (Simple) */}
        <div className="flex gap-4 border-b border-slate-200 overflow-x-auto no-scrollbar">
          <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-bold text-sm whitespace-nowrap">
            All Leads <span className="ml-1 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full text-[10px]">{MOCK_LEADS.length}</span>
          </button>
          <button className="pb-3 border-b-2 border-transparent text-slate-400 font-medium text-sm whitespace-nowrap hover:text-slate-600">
            New <span className="ml-1 bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full text-[10px]">2</span>
          </button>
          <button className="pb-3 border-b-2 border-transparent text-slate-400 font-medium text-sm whitespace-nowrap hover:text-slate-600">
            Follow-ups
          </button>
          <button className="pb-3 border-b-2 border-transparent text-slate-400 font-medium text-sm whitespace-nowrap hover:text-slate-600">
            Scheduled
          </button>
        </div>
      </div>

      {/* List */}
      <div className="px-4 pb-20 pt-2 space-y-3">
        {MOCK_LEADS.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        
        <div className="text-center py-6">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">End of List</p>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;