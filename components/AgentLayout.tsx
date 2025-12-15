import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

const AgentLayout: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <TopBar 
        isOffline={isOffline} 
        toggleOffline={() => setIsOffline(!isOffline)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <Outlet context={{ isOffline }} />
      </main>

      <BottomNav />
    </div>
  );
};

export default AgentLayout;