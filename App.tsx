import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import DevRoleSwitcher from './components/DevRoleSwitcher';

import Login from './components/Login';
import Onboarding from './components/Onboarding';

// Layouts
import AgentLayout from './components/AgentLayout';
import BusinessLayout from './components/BusinessLayout';
import SuperAdminLayout from './components/SuperAdminLayout';

// Pages
import BolkarRecorder from './components/BolkarRecorder';
import LeadsPage from './components/LeadsPage';
import SettingsPage from './components/SettingsPage';
import AgentDashboard from './components/AgentDashboard';
import PlaceholderPage from './components/PlaceholderPage';
import ToolsPage from './components/ToolsPage';
import BusinessDashboard from './components/BusinessDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import TenantManagement from './components/TenantManagement';
import TeamManagement from './components/TeamManagement';
import PipelineBoard from './components/PipelineBoard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        {/* Developer Tool: Visible on all pages for easy testing */}
        <DevRoleSwitcher />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Onboarding (Must be Auth, but No Profile) */}
          <Route path="/onboarding" element={
            <AuthGuard>
              <Onboarding />
            </AuthGuard>
          } />

          {/* Agent Routes */}
          <Route path="/agent" element={
            <AuthGuard allowedRoles={['agent']}>
              <AgentLayout />
            </AuthGuard>
          }>
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="bolkar" element={<BolkarRecorder />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Business Owner Routes */}
          <Route path="/app" element={
            <AuthGuard allowedRoles={['business_owner']}>
              <BusinessLayout />
            </AuthGuard>
          }>
            <Route path="dashboard" element={<BusinessDashboard />} />
            <Route path="crm" element={<PipelineBoard />} />
            <Route path="growth" element={<PlaceholderPage />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="settings" element={<PlaceholderPage />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/platform" element={
            <AuthGuard allowedRoles={['super_admin']}>
              <SuperAdminLayout />
            </AuthGuard>
          }>
            <Route path="overview" element={<SuperAdminDashboard />} />
            <Route path="tenants" element={<TenantManagement />} />
            <Route path="subscriptions" element={<PlaceholderPage />} />
            <Route path="logs" element={<PlaceholderPage />} />
            <Route path="settings" element={<PlaceholderPage />} />
            <Route index element={<Navigate to="overview" replace />} />
          </Route>

          {/* Root Redirect */}
          <Route path="/" element={<AuthGuard><div /></AuthGuard>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;