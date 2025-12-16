import React, { useState } from 'react';
import { User, Building2, HardHat, ChevronRight } from 'lucide-react';

interface SetupOwnerScreenProps {
  onComplete: (data: any) => void;
  isLoading: boolean;
}

const SetupOwnerScreen: React.FC<SetupOwnerScreenProps> = ({ onComplete, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    type: 'builder' // default
  });

  const businessTypes = [
    { id: 'freelancer', label: 'Freelancer', icon: User, desc: 'Individual Broker' },
    { id: 'builder', label: 'Builder', icon: Building2, desc: 'Development Firm' },
    { id: 'contractor', label: 'Contractor', icon: HardHat, desc: 'Civil & Labour' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
        
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Setup Workspace</h1>
            <p className="text-slate-500 mt-1">Tell us about your business</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Visual Selector */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Business Type</label>
            <div className="grid grid-cols-3 gap-3">
              {businessTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.type === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({...formData, type: type.id})}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
             <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  placeholder="e.g. Rahul Sharma"
                />
             </div>

             <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Company Name</label>
                <input 
                  required
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  placeholder="e.g. Sharma Estates"
                />
             </div>

             <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  placeholder="rahul@example.com"
                />
             </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-8"
          >
            Create Workspace <ChevronRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupOwnerScreen;