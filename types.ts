import React from 'react';

export type UserRole = 'super_admin' | 'business_owner' | 'agent' | null;

export interface UserPermissions {
  can_create_ads?: boolean;
  can_view_leads?: boolean;
  can_access_site?: boolean;
  can_view_roi?: boolean;
  can_manage_team?: boolean;
}

export interface UserProfile {
  uid: string;
  phoneNumber: string;
  role: UserRole;
  tenantId?: string;
  is_active: boolean;
  name?: string;     // Optional display name
  status?: string;   // Added status field (e.g. 'invited')
  permissions?: UserPermissions; // Fine-grained permissions
  createdAt?: any;
}

export interface BusinessProfile {
  id: string;
  ownerId: string;
  name: string;
  city?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt?: any;
}

export interface VoiceLog {
  id: string;
  userId: string;
  timestamp: string; // ISO string
  durationSeconds: number;
  status: 'queued' | 'processed';
  transcript?: string;
  intent?: 'add_lead' | 'update_status' | 'log_visit';
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: 'New' | 'Follow-up' | 'Visit Scheduled' | 'Closed';
  source: 'Facebook' | 'Instagram' | 'Google' | 'Referral';
  campaign: string;
  timestamp: string; // relative string for mock (e.g., "2h ago")
  budget: string;
  requirements: string;
  unread: boolean;
  tags?: string[];
}

export interface NavItem {
  key: string; // Unique key for routing
  label: string;
  path: string;
  icon: React.ElementType;
}

export interface AppPermissions {
  canManageTeam: boolean;
  canViewAds: boolean;
  canViewSiteOps: boolean;
  canViewLeads: boolean;
}