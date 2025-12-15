import React from 'react';
import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

const PlaceholderPage: React.FC = () => {
    const location = useLocation();
    const title = location.pathname.split('/').pop();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50">
      <div className="bg-slate-200 p-4 rounded-full mb-4">
        <Construction size={32} className="text-slate-500" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 capitalize mb-2">{title}</h2>
      <p className="text-slate-500">
        This module is under construction. Check back later!
      </p>
      <div className="mt-8 w-full max-w-xs space-y-3">
          {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-white rounded-lg shadow-sm w-full animate-pulse" />
          ))}
      </div>
    </div>
  );
};

export default PlaceholderPage;
