import React, { useState } from 'react';
import { MOCK_ALL_USERS } from '../lib/mockData';
import { Search, ShieldAlert, Ban, MoreHorizontal } from 'lucide-react';

const GlobalUserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleBanUser = (name: string) => {
    if (confirm(`Are you sure you want to BAN ${name}? This action is irreversible.`)) {
      alert(`${name} has been banned from the platform.`);
    }
  };

  const filteredUsers = MOCK_ALL_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Dark/Red "God Mode" Header */}
      <div className="bg-red-950 text-white p-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert className="text-red-500" size={24} />
          <h1 className="text-xl font-bold uppercase tracking-wider">Global User Registry</h1>
        </div>
        <p className="text-red-200 text-xs font-mono">
          PRIVILEGED ACCESS. LOGGING ENABLED.
        </p>
      </div>

      {/* Toolbar */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users, companies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-transparent focus:bg-white focus:border-red-900 focus:ring-0 rounded-lg transition-all outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-100">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  user.status === 'Banned' ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600'
                }`}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${user.status === 'Banned' ? 'text-red-600 line-through' : 'text-slate-900'}`}>
                    {user.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {user.role} • <span className="text-slate-700 font-medium">{user.company}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 {user.status !== 'Banned' && (
                    <button 
                        onClick={() => handleBanUser(user.name)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-300 hover:text-red-600 transition-colors"
                        title="Ban User"
                    >
                        <Ban size={18} />
                    </button>
                 )}
                 <button className="h-8 w-8 flex items-center justify-center text-slate-400">
                    <MoreHorizontal size={18} />
                 </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-slate-400">
                No users found.
            </div>
        )}
      </div>
    </div>
  );
};

export default GlobalUserList;