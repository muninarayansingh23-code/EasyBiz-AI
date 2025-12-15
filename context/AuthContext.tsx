import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserProfile, createProfile } from '../lib/db';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Temporary storage for phone number during onboarding flow
  // (Since we are using anonymous auth to simulate phone auth for this phase)
  const [tempPhone, setTempPhone] = useState<string>('');

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // User is signed in, fetch their profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
      } else {
        // User is signed out
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (phoneNumber: string) => {
    setLoading(true);
    try {
      setTempPhone(phoneNumber);
      // For Phase 1 backend connection without full Recaptcha UI setup,
      // we use signInAnonymously to establish a valid Firebase UID session.
      // In a full production Phone Auth flow, this would be signInWithPhoneNumber.
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setTempPhone('');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const updateProfile = async (profile: UserProfile) => {
    if (!user) return;

    try {
      // Ensure we attach the phone number if it wasn't in the profile object
      // (Handling the case where we passed it from Login screen -> AuthContext -> Onboarding)
      const profileData = { 
        ...profile, 
        uid: user.uid,
        phoneNumber: profile.phoneNumber || tempPhone 
      };

      await createProfile(user.uid, profileData);
      
      // Update local state immediately for UI responsiveness
      setUserProfile(profileData);
    } catch (error) {
      console.error("Update Profile Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
