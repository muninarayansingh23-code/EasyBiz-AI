import React, { useState } from 'react';
import { CheckCircle2, XCircle, Building, ShieldCheck, ArrowRight } from 'lucide-react';

interface WelcomeStaffScreenProps {
  onJoin: (name: string) => void;
  isLoading: boolean;
  tenantName?: string;
}

const WelcomeStaffScreen: React.FC<WelcomeStaffScreenProps> = ({ onJoin, isLoading, tenantName = "Demo Constructions" }) => {
  const [name, setName] = useState('');

  const permissions = [
    { label: 'Site Operations', access: true },
    { label: 'Lead Management', access: true },
    { label: 'Voice Logger', access: true },
    { label: 'Financial Reports', access: false },
    { label: 'Team Settings', access: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onJoin(name);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Card */}
        <div className="bg-[#1e1b4b] p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Building size={32} className="text-blue-300" />
            </div>
            <h1 className="text-xl font-bold mb-1">Welcome to the Team!</h1>
            <p className="text-indigo-200 text-sm">You are joining <span className="text-white font-bold underline">{tenantName}</span></p>
        </div>

        <div className="p-6">
            <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck size={14} /> Your Access Rights
                </h3>
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {permissions.map((perm, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${perm.access ? 'text-slate-700' : 'text-slate-400'}`}>
                                {perm.label}
                            </span>
                            {perm.access ? (
                                <CheckCircle2 size={18} className="text-green-500" />
                            ) : (
                                <XCircle size={18} className="text-slate-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">Your Name</label>
                    <input 
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                        placeholder="e.g. Suresh Singh"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!name.trim() || isLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                >
                    Join Team <ArrowRight size={18} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStaffScreen;