import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import DevRoleSwitcher from './components/DevRoleSwitcher';

// Screens / Stacks
import Login from './components/Login';
import Onboarding from './components/Onboarding';

// Layouts / Navigators
import MainTabNavigator from './components/MainTabNavigator';
import SuperAdminLayout from './components/SuperAdminLayout';

// Content Screens
import AgentDashboard from './components/AgentDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import LeadsPage from './components/LeadsPage';
import BolkarRecorder from './components/BolkarRecorder';
import ToolsPage from './components/ToolsPage';
import TeamManagement from './components/TeamManagement';
import PipelineBoard from './components/PipelineBoard';
import PlaceholderPage from './components/PlaceholderPage';
import TenantManagement from './components/TenantManagement';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import SettingsPage from './components/SettingsPage';
import GlobalUserList from './components/GlobalUserList';

// Helper Component to route Dashboard based on Role within the Main Tab
import { useAuth } from './context/AuthContext';
const UnifiedDashboardRouter = () => {
    const { userProfile } = useAuth();
    if (userProfile?.role === 'business_owner') return <BusinessDashboard />;
    return <AgentDashboard />;
};

// "AppNavigator" Logic
const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        {/* Dev Tool: Helps simulate Role Switching for testing Navigators */}
        <DevRoleSwitcher />

        <Routes>
          {/* --- Auth Stack --- */}
          <Route path="/login" element={<Login />} />
          
          {/* --- Onboarding Stack (NEW_USER / INVITED) --- */}
          <Route path="/onboarding" element={
            <AuthGuard>
              <Onboarding />
            </AuthGuard>
          } />

          {/* --- SuperAdmin Stack --- */}
          <Route path="/platform" element={
            <AuthGuard allowedRoles={['super_admin']}>
              <SuperAdminLayout />
            </AuthGuard>
          }>
            <Route path="overview" element={<SuperAdminDashboard />} />
            <Route path="tenants" element={<TenantManagement />} />
            <Route path="users" element={<GlobalUserList />} />
            <Route path="subscriptions" element={<PlaceholderPage />} />
            <Route path="logs" element={<PlaceholderPage />} />
            <Route index element={<Navigate to="overview" replace />} />
          </Route>

          {/* --- Main Tab Navigator (Unified App Stack) --- */}
          {/* This handles both Agents and Owners via permissions */}
          <Route path="/app" element={
            <AuthGuard allowedRoles={['agent', 'business_owner']}>
              <MainTabNavigator />
            </AuthGuard>
          }>
            
            {/* HomeDashboard */}
            <Route path="dashboard" element={<UnifiedDashboardRouter />} />
            
            {/* SalesInbox */}
            <Route path="leads" element={<LeadsPage />} />
            <Route path="crm" element={<PipelineBoard />} />
            
            {/* SiteOps */}
            <Route path="bolkar" element={<BolkarRecorder />} />
            
            {/* GrowthStudio */}
            <Route path="growth" element={<ToolsPage />} />
            
            {/* TeamManager */}
            <Route path="team" element={<TeamManagement />} />
            
            {/* Settings */}
            <Route path="settings" element={<SettingsPage />} />

            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Legacy Redirects for compatibility */}
          <Route path="/agent/*" element={<Navigate to="/app/bolkar" replace />} />
          
          {/* Root Redirect */}
          <Route path="/" element={<AuthGuard><div /></AuthGuard>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;