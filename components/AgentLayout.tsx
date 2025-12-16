import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, List, Mic, Rocket } from 'lucide-react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { NavItem } from '../types';

const AgentLayout: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  // Default tabs for Agent Layout (Legacy/Standalone usage)
  const tabs: NavItem[] = [
    { key: 'HomeDashboard', label: 'Home', path: '/agent/dashboard', icon: LayoutDashboard },
    { key: 'SalesInbox', label: 'Leads', path: '/agent/leads', icon: List },
    { key: 'SiteOps', label: 'Bolkar', path: '/agent/bolkar', icon: Mic },
    { key: 'GrowthStudio', label: 'Ads', path: '/agent/growth', icon: Rocket },
  ];

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

      <BottomNav tabs={tabs} />
    </div>
  );
};

export default AgentLayout;