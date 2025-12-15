import React, { useState } from 'react';
import { Phone, MessageCircle, FileText, ChevronDown, Facebook, Instagram, Globe, Clock } from 'lucide-react';
import { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Facebook': return <Facebook size={14} className="text-blue-600" />;
      case 'Instagram': return <Instagram size={14} className="text-pink-600" />;
      case 'Google': return <Globe size={14} className="text-green-600" />;
      default: return <Globe size={14} className="text-slate-500" />;
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi ${lead.name}, I received your inquiry regarding ${lead.campaign}. How can I help you?`;
    // Mock opening WhatsApp
    window.open(`https://wa.me/${lead.phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${lead.phone}`, '_self');
  };

  const handleScripts = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Opening Quick Scripts Library...");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-3">
      {/* Clickable Body for Details */}
      <div 
        className="p-4 cursor-pointer active:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header: Name + Time + Source */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <h3 className={`text-lg font-bold text-slate-900 leading-tight ${lead.unread ? 'flex items-center gap-2' : ''}`}>
              {lead.name}
              {lead.unread && <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
               <span>{lead.timestamp}</span>
               <span className="text-slate-300">•</span>
               <div className="flex items-center gap-1">
                 {getSourceIcon(lead.source)}
                 <span>{lead.source}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Badges / Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
           {lead.tags && lead.tags.map(tag => (
               <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide rounded-md border border-slate-200">
                   {tag}
               </span>
           ))}
           <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide rounded-md border border-blue-100">
                {lead.status}
           </span>
        </div>

        {/* Action Grid (Privyr Style) */}
        <div className="grid grid-cols-4 gap-2 h-11" onClick={(e) => e.stopPropagation()}>
          {/* WhatsApp - Takes up 2 cols */}
          <button 
            onClick={handleWhatsApp}
            className="col-span-2 bg-[#25D366] hover:bg-[#128C7E] active:bg-[#128C7E] text-white rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm active:scale-95"
          >
            <MessageCircle size={18} fill="white" className="text-white" />
            WhatsApp
          </button>
          
          {/* Call - Takes 1 col */}
          <button 
            onClick={handleCall}
            className="col-span-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-all shadow-sm active:scale-95"
          >
            <Phone size={18} fill="currentColor" />
          </button>
          
          {/* Scripts / Notes - Takes 1 col */}
          <button 
            onClick={handleScripts}
            className="col-span-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center transition-all border border-slate-200 active:scale-95"
          >
             <div className="flex flex-col items-center">
                <FileText size={18} />
                <span className="text-[9px] font-bold mt-0.5">Scripts</span>
             </div>
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="bg-slate-50 px-4 py-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-2">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Budget</p>
              <p className="text-sm font-semibold text-slate-700">{lead.budget}</p>
            </div>
             <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Mobile</p>
              <p className="text-sm font-semibold text-slate-700 font-mono">{lead.phone}</p>
            </div>
            <div className="col-span-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Campaign</p>
                <p className="text-sm font-medium text-slate-700">{lead.campaign}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 mt-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Requirements</p>
            <p className="text-sm text-slate-600 leading-relaxed italic">"{lead.requirements}"</p>
          </div>
          <div className="mt-4 flex justify-center">
            <button 
                onClick={() => setIsExpanded(false)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 p-2"
            >
               Close <ChevronDown className="rotate-180" size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadCard;