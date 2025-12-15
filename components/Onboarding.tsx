import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, ChevronRight, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { doc, getDoc, collection, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [businessName, setBusinessName] = useState('');
  const [userName, setUserName] = useState('');
  const [city, setCity] = useState('');
  const [teamCode, setTeamCode] = useState('');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
    setError('');
  };

  const createBusiness = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    
    try {
      // Generate a new Business ID
      const businessRef = doc(collection(db, "businesses"));
      const newTenantId = businessRef.id;
      const userRef = doc(db, "users", user.uid);

      // Perform Transaction: Create Business + Create User
      await runTransaction(db, async (transaction) => {
        // 1. Create Business Doc
        transaction.set(businessRef, {
          name: businessName,
          ownerId: user.uid,
          plan: 'Free',
          city: city,
          createdAt: serverTimestamp()
        });

        // 2. Create User Doc (Base fields)
        transaction.set(userRef, {
            uid: user.uid,
            role: 'business_owner',
            tenantId: newTenantId,
            name: userName,
            is_active: true,
            createdAt: serverTimestamp(),
            ...(user.phoneNumber ? { phoneNumber: user.phoneNumber } : {})
        }, { merge: true });
      });

      // 3. Sync AuthContext (Critical for redirects and phone number patching)
      await updateProfile({
        uid: user.uid,
        phoneNumber: user.phoneNumber || '', 
        role: 'business_owner',
        tenantId: newTenantId,
        name: userName,
        is_active: true,
        createdAt: new Date().toISOString()
      });

      navigate('/app/dashboard');
    } catch (err: any) {
      console.error("Setup Error:", err);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinTeam = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const code = teamCode.trim();
      if (!code) throw new Error("Please enter a Team ID.");

      // 1. Validate Team Code (Tenant ID)
      const businessRef = doc(db, "businesses", code);
      const businessSnap = await getDoc(businessRef);
      
      if (!businessSnap.exists()) {
        throw new Error("Invalid Team Code. Business not found.");
      }
      
      // 2. Update Profile & Link to Tenant
      await updateProfile({
        uid: user.uid,
        phoneNumber: user.phoneNumber || '',
        role: 'agent',
        tenantId: code,
        name: userName,
        is_active: true,
        createdAt: new Date().toISOString()
      });

      navigate('/agent/dashboard');
    } catch (err: any) {
      console.error("Join Error:", err);
      setError(err.message || 'Failed to join team.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'business_owner') {
      createBusiness();
    } else {
      joinTeam();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-lg mt-8">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8 px-4">
          <h1 className="text-2xl font-bold text-slate-900">
            {step === 1 ? 'Welcome to EazyBiz' : 'Complete Profile'}
          </h1>
          <div className="flex items-center space-x-2">
            <span className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-blue-200'}`} />
            <span className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
          </div>
        </div>

        {error && (
            <div className="mb-6 mx-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
              <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
        )}

        {step === 1 ? (
          <div className="grid gap-4 px-2">
            <p className="text-slate-500 mb-4">How do you want to use EazyBiz?</p>
            
            <button
              onClick={() => handleRoleSelect('business_owner')}
              className="group relative flex flex-col p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <div className="h-6 w-6 rounded-full border-2 border-slate-300 group-hover:border-blue-500 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">I am a Business Owner</h3>
              <p className="text-sm text-slate-500 mt-1">
                Create a new workspace for my Real Estate or Construction business.
              </p>
            </button>

            <button
              onClick={() => handleRoleSelect('agent')}
              className="group relative flex flex-col p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all text-left"
            >
               <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User size={24} />
                </div>
                <div className="h-6 w-6 rounded-full border-2 border-slate-300 group-hover:border-green-500 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">I am Joining a Team</h3>
              <p className="text-sm text-slate-500 mt-1">
                I have an invite code from my employer.
              </p>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mx-2">
             <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-slate-400 hover:text-slate-600 mb-6 flex items-center"
            >
               <ChevronRight className="rotate-180 mr-1" size={14} /> Back
            </button>

            <div className="space-y-5">
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Your Full Name</label>
                 <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. Rahul Sharma"
                  />
              </div>

              {role === 'business_owner' ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g. Sharma Estates"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">City / HQ</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g. Mumbai"
                    />
                  </div>
                </>
              ) : (
                <>
                   <div className="bg-amber-50 p-4 rounded-lg flex items-start border border-amber-100">
                      <AlertTriangle className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" size={18} />
                      <p className="text-sm text-amber-800">
                        You need the <strong>Team ID</strong> from your manager to join.
                      </p>
                   </div>
                   <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Team ID Code</label>
                    <input
                      type="text"
                      required
                      value={teamCode}
                      onChange={(e) => setTeamCode(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500 outline-none text-center font-mono tracking-wider"
                      placeholder="Paste ID here"
                    />
                  </div>
                </>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-slate-900 text-white py-4 px-4 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  {role === 'business_owner' ? 'Creating Workspace...' : 'Joining Team...'}
                </>
              ) : (
                'Complete Setup'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Onboarding;