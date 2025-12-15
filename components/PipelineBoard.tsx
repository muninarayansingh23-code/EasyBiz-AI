import React from 'react';
import { MOCK_LEADS } from '../lib/mockData';
import { 
  MoreHorizontal, Plus, Filter, Calendar, 
  MapPin, DollarSign 
} from 'lucide-react';

const PipelineBoard: React.FC = () => {
  const COLUMNS = [
    { id: 'New', title: 'New Leads', color: 'border-blue-500' },
    { id: 'Follow-up', title: 'Contacted', color: 'border-amber-500' },
    { id: 'Visit Scheduled', title: 'Site Visit', color: 'border-purple-500' },
    { id: 'Negotiation', title: 'Negotiation', color: 'border-pink-500' },
    { id: 'Closed', title: 'Closed', color: 'border-green-500' },
  ];

  // Helper to map MOCK_LEADS status to columns loosely
  const getLeadsForColumn = (columnId: string) => {
    // Exact match or fallback for demo purposes
    if (columnId === 'Negotiation') return []; // Empty state demo
    if (columnId === 'Contacted') return MOCK_LEADS.filter(l => l.status === 'Follow-up');
    if (columnId === 'Site Visit') return MOCK_LEADS.filter(l => l.status === 'Visit Scheduled');
    return MOCK_LEADS.filter(l => l.status === columnId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
          <p className="text-sm text-slate-500">Visualise and manage your deal flow.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 flex items-center gap-2">
             <Filter size={16} /> Filter
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-200 transition-colors flex items-center gap-2">
            <Plus size={18} /> Add Deal
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-4 pb-4 min-w-max">
            
          {COLUMNS.map((col) => {
            const leads = getLeadsForColumn(col.id);
            
            return (
              <div key={col.id} className="w-80 flex flex-col bg-slate-100 rounded-xl border border-slate-200/60 max-h-full">
                {/* Column Header */}
                <div className={`p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-xl border-t-4 ${col.color}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-700 text-sm">{col.title}</h3>
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {leads.length}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Cards Container */}
                <div className="p-2 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                  {leads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md cursor-grab active:cursor-grabbing transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          lead.tags?.includes('Hot') 
                            ? 'bg-red-50 text-red-600 border-red-100' 
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {lead.tags?.[0] || 'Lead'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                           {lead.timestamp}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-slate-900 mb-1">{lead.name}</h4>
                      
                      <div className="space-y-1 mb-3">
                         <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <DollarSign size={12} className="text-slate-400" />
                            {lead.budget}
                         </div>
                         <div className="flex items-center gap-1.5 text-xs text-slate-500">
                             <MapPin size={12} className="text-slate-400" />
                             Andheri West
                         </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                         <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                            VK
                         </div>
                         {lead.source && (
                             <span className="text-[10px] font-medium text-slate-400 uppercase">
                                 {lead.source}
                             </span>
                         )}
                      </div>
                    </div>
                  ))}

                  {leads.length === 0 && (
                      <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium">
                          No deals here
                      </div>
                  )}
                  
                  {/* Add Button Placeholder */}
                  <button className="w-full py-2 flex items-center justify-center gap-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors text-xs font-bold">
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PipelineBoard;