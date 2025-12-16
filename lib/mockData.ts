import { UserProfile, VoiceLog, Lead } from '../types';

export const MOCK_USERS: (UserProfile & { status?: string })[] = [
  {
    uid: 'u1',
    name: 'Rajesh Kumar',
    phoneNumber: '+919876543210',
    role: 'business_owner',
    is_active: true,
    status: 'active'
  },
  {
    uid: 'u2',
    name: 'Suresh Singh',
    phoneNumber: '+919876543211',
    role: 'agent',
    tenantId: 'RAJ123',
    is_active: true,
    status: 'active'
  },
  {
    uid: 'u3',
    name: 'Pending Agent',
    phoneNumber: '+919000000000',
    role: 'agent',
    tenantId: 'RAJ123',
    is_active: false,
    status: 'invited' // Specific status for logic fork
  }
];

export const MOCK_LOGS: VoiceLog[] = [
  {
    id: 'log1',
    userId: 'u2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    durationSeconds: 15,
    status: 'processed',
    transcript: 'Met with client Mr. Sharma at Andheri site. Interested in 2BHK.',
    intent: 'log_visit',
  },
  {
    id: 'log2',
    userId: 'u2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    durationSeconds: 8,
    status: 'queued',
    intent: 'update_status',
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Amit Sharma',
    phone: '+919876500001',
    status: 'New',
    source: 'Facebook',
    campaign: 'Diwali Dhamaka Offer',
    timestamp: '5m ago',
    budget: '₹85L - ₹1.2Cr',
    requirements: '3BHK, Sea Facing, Ready to Move',
    unread: true,
    tags: ['Hot', '3BHK Interest', 'Investor']
  },
  {
    id: 'l2',
    name: 'Priya Verma',
    phone: '+919876500002',
    status: 'Follow-up',
    source: 'Instagram',
    campaign: 'Monsoon Sale Lead',
    timestamp: '2h ago',
    budget: '₹60L - ₹80L',
    requirements: '2BHK in Thane, Near Station',
    unread: false,
    tags: ['First Time Buyer']
  },
  {
    id: 'l3',
    name: 'Rahul Deshmukh',
    phone: '+919876500003',
    status: 'Visit Scheduled',
    source: 'Google',
    campaign: 'Website Traffic',
    timestamp: '1d ago',
    budget: '₹2Cr+',
    requirements: '4BHK Penthouse, Gated Community',
    unread: false,
    tags: ['High Net Worth', 'Urgent']
  },
  {
    id: 'l4',
    name: 'Vikram Singh',
    phone: '+919876500004',
    status: 'New',
    source: 'Facebook',
    campaign: 'Pre-Launch Offer',
    timestamp: '1d ago',
    budget: '₹45L',
    requirements: '1BHK Investment, Rental Yield Focus',
    unread: true,
    tags: ['Investor', 'Commercial']
  },
  {
    id: 'l5',
    name: 'Anjali Gupta',
    phone: '+919876500005',
    status: 'Closed',
    source: 'Referral',
    campaign: 'Existing Client',
    timestamp: '3d ago',
    budget: '₹1.5Cr',
    requirements: 'Commercial Shop, Ground Floor',
    unread: false,
    tags: ['Closed', 'Past Client']
  }
];

export const HINTS = [
  "Add Lead: 'New lead, Amit, 3BHK interest...'",
  "Update Status: 'Client confirmed for Sunday visit...'",
  "Log Visit: 'Site visit done at Project Green...'",
];

// --- NEW MOCK DATA FOR ADMIN / PLATFORM ---

export const MOCK_TENANTS = [
  { id: 1, name: "Skyline Realty", owner: "Rajesh Kumar", phone: "+91 9876543210", plan: "Pro", status: "Active", leads: 145, revenue: 5000 },
  { id: 2, name: "Dream Homes", owner: "Suresh Singh", phone: "+91 9876543211", plan: "Enterprise", status: "Active", leads: 320, revenue: 15000 },
  { id: 3, name: "City Constructions", owner: "Anil Gupta", phone: "+91 9876543212", plan: "Free", status: "Suspended", leads: 12, revenue: 0 },
  { id: 4, name: "Urban Spaces", owner: "Priya Menon", phone: "+91 9876543213", plan: "Pro", status: "Active", leads: 88, revenue: 2500 },
  { id: 5, name: "Metro Builders", owner: "Vikram Malhotra", phone: "+91 9876543214", plan: "Free", status: "Active", leads: 45, revenue: 0 },
];

export const MOCK_GLOBAL_STATS = { 
  totalMRR: 45000, 
  activeTenants: 12, 
  totalLeads: 1250 
};

export const MOCK_AGENTS = [
    { id: 1, name: "Vikram Singh", status: "online", leads: 12, msgs: 45, conversion: 5.2 },
    { id: 2, name: "Priya Verma", status: "online", leads: 8, msgs: 32, conversion: 8.1 },
    { id: 3, name: "Rahul Deshmukh", status: "offline", leads: 15, msgs: 20, conversion: 2.4 },
    { id: 4, name: "Anita Roy", status: "online", leads: 22, msgs: 60, conversion: 6.5 },
    { id: 5, name: "John Doe", status: "offline", leads: 5, msgs: 10, conversion: 1.2 },
];

export const MOCK_ALL_USERS = [
  { id: 1, name: "Rajesh Kumar", role: "Business Owner", company: "Skyline Realty", status: "Active" },
  { id: 2, name: "Suresh Singh", role: "Business Owner", company: "Dream Homes", status: "Active" },
  { id: 3, name: "Vikram Singh", role: "Agent", company: "Skyline Realty", status: "Active" },
  { id: 4, name: "Priya Verma", role: "Agent", company: "Dream Homes", status: "Active" },
  { id: 5, name: "Anil Gupta", role: "Business Owner", company: "City Constructions", status: "Banned" },
  { id: 6, name: "John Doe", role: "Agent", company: "Urban Spaces", status: "Active" },
  { id: 7, name: "Jane Smith", role: "Super Admin", company: "EazyBiz Platform", status: "Active" },
  { id: 8, name: "Rahul Deshmukh", role: "Agent", company: "Dream Homes", status: "Active" },
];