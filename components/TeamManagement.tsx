import React, { useState } from 'react';
import { MOCK_AGENTS } from '../lib/mockData';
import { 
  Plus, Search, MoreVertical, X,
  Rocket, Eye, HardHat, TrendingUp 
} from 'lucide-react';

const TeamManagement: React.FC = () => {
  const [showInviteSheet, setShowInviteSheet] = useState(false);
  
  // Permission Toggles State
  const [permissions, setPermissions] = useState({
    canCreateAds: false,
    canViewLeads: true,
    canAccessSite: true,
    canViewROI: false
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInviteSheet(false);
    // Logic to save new member would go here
  };

  return (
    <div className="h-full flex flex-col relative bg-slate-50">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">My Team</h1>
        <button 
          onClick={() => setShowInviteSheet(true)}
          className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {MOCK_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                    {agent.name.charAt(0)}
                  </div>
                  {/* Green Dot for Active Status */}
                  {agent.status === 'online' && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
               </div>
               <div>
                  <h3 className="font-bold text-slate-900">{agent.name}</h3>
                  <p className="text-xs text-slate-500">Sales Executive</p>
               </div>
            </div>
            <button className="text-slate-400 p-2">
              <MoreVertical size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Invite Sheet (Bottom Drawer/Modal) */}
      {showInviteSheet && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setShowInviteSheet(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 md:max-w-md md:mx-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Invite New Member</h2>
                <button onClick={() => setShowInviteSheet(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input type="text" placeholder="e.g. Amit Verma" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                {/* The Key-Ring Permissions */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Access Permissions</label>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-100">
                    
                    {/* Permission Item 1 */}
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <Rocket size={16} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Can Create Ads</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => togglePermission('canCreateAds')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${permissions.canCreateAds ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`h-4 w-4 bg-white rounded-full absolute top-1 transition-all ${permissions.canCreateAds ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                    {/* Permission Item 2 */}
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                          <Eye size={16} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Can View Leads</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => togglePermission('canViewLeads')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${permissions.canViewLeads ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                         <div className={`h-4 w-4 bg-white rounded-full absolute top-1 transition-all ${permissions.canViewLeads ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                    {/* Permission Item 3 */}
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                          <HardHat size={16} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Can Access Site</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => togglePermission('canAccessSite')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${permissions.canAccessSite ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                         <div className={`h-4 w-4 bg-white rounded-full absolute top-1 transition-all ${permissions.canAccessSite ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                    {/* Permission Item 4 */}
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                          <TrendingUp size={16} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Can View ROI</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => togglePermission('canViewROI')}
                        className={`w-11 h-6 rounded-full transition-colors relative ${permissions.canViewROI ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                         <div className={`h-4 w-4 bg-white rounded-full absolute top-1 transition-all ${permissions.canViewROI ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg">
                  Send Invitation
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamManagement;