import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { useAuth } from '../context/AuthContext';
import { NavItem, AppPermissions } from '../types';
import { 
  LayoutDashboard, List, Mic, Rocket, Users 
} from 'lucide-react';

const MainTabNavigator: React.FC = () => {
  const { userProfile } = useAuth();
  const [isOffline, setIsOffline] = useState(false);

  // 1. Define Permissions based on User Profile (DB Source of Truth)
  const permissions: AppPermissions = useMemo(() => {
    // If permissions exist in profile, use them.
    // Otherwise fallback to Role-based defaults (Legacy/Mock compatibility)
    if (userProfile?.permissions) {
      return {
        canManageTeam: !!userProfile.permissions.can_manage_team,
        canViewAds: !!userProfile.permissions.can_create_ads,
        canViewSiteOps: !!userProfile.permissions.can_access_site,
        canViewLeads: !!userProfile.permissions.can_view_leads
      };
    }

    // Default Fallback
    const role = userProfile?.role;
    return {
      canManageTeam: role === 'business_owner',
      canViewAds: true, 
      canViewSiteOps: true,
      canViewLeads: true,
    };
  }, [userProfile]);

  // 2. Generate Tabs based on Permissions
  const tabs: NavItem[] = useMemo(() => {
    const t: NavItem[] = [];

    // Always Visible: Home Dashboard
    t.push({ 
      key: 'HomeDashboard', 
      label: 'Home', 
      path: '/app/dashboard', 
      icon: LayoutDashboard 
    });

    // Conditional: Leads (SalesInbox)
    if (permissions.canViewLeads) {
      t.push({ 
        key: 'SalesInbox', 
        label: 'Leads', 
        path: '/app/leads', 
        icon: List 
      });
    }

    // Conditional: Site Ops (Bolkar/Mic)
    // Only show if they have site access
    if (permissions.canViewSiteOps) {
      t.push({ 
        key: 'SiteOps', 
        label: 'Bolkar', 
        path: '/app/bolkar', 
        icon: Mic // Rendered as Floating Button in BottomNav
      });
    }

    // Conditional: Growth Studio (Ads)
    // "Ensure a user CANNOT see the 'Growth Studio' tab if permissions.can_create_ads is false."
    if (permissions.canViewAds) {
      t.push({ 
        key: 'GrowthStudio', 
        label: 'Ads', 
        path: '/app/growth', 
        icon: Rocket 
      });
    }

    // Conditional: Team Manager (Owner Only)
    if (permissions.canManageTeam) {
      t.push({ 
        key: 'TeamManager', 
        label: 'Team', 
        path: '/app/team', 
        icon: Users 
      });
    }

    return t;
  }, [permissions]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <TopBar 
        isOffline={isOffline} 
        toggleOffline={() => setIsOffline(!isOffline)} 
      />

      {/* Main Content Area (Stack Screen Outlet) */}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <Outlet context={{ isOffline }} />
      </main>

      <BottomNav tabs={tabs} />
    </div>
  );
};

export default MainTabNavigator;