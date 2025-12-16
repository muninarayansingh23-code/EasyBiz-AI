import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPhoneNumber, 
  ConfirmationResult, 
  ApplicationVerifier, 
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../lib/firebase';
import { UserProfile, BusinessProfile } from '../types';
import { createOwnerProfile, createProfile } from '../lib/db';

// Types representing the Identity Fork Status
export type UserStatus = 'NEW_USER' | 'INVITED' | 'ACTIVE' | null;

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userStatus: UserStatus;
  loading: boolean;
  loginWithPhone: (phoneNumber: string, appVerifier: ApplicationVerifier | null) => Promise<void>;
  verifyOTP: (otp: string) => Promise<UserStatus>;
  logout: () => void;
  updateProfile: (profile: UserProfile, companyData?: Partial<BusinessProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  userStatus: null,
  loading: true,
  loginWithPhone: async () => {},
  verifyOTP: async () => 'NEW_USER',
  logout: () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>(null);
  const [loading, setLoading] = useState(true);
  
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);

  // --- THE LOGIC FORK (Crucial) ---
  const checkUserStatus = async (firebaseUser: User): Promise<{ status: UserStatus; profile: UserProfile | null }> => {
    // REMOVED: God Mode / Mock User Checks
    // We are now running purely on Live Firebase Data

    try {
      // Step 2: Lookup by UID (Normal Path - Already Registered)
      const uidRef = doc(db, 'users', firebaseUser.uid);
      const uidSnap = await getDoc(uidRef);

      if (uidSnap.exists()) {
        const data = uidSnap.data() as UserProfile;
        return { status: 'ACTIVE', profile: data };
      }

      // Step 3: Lookup by Phone Number (The "Invited" Path)
      if (firebaseUser.phoneNumber) {
         const phoneRef = doc(db, 'users', firebaseUser.phoneNumber);
         const phoneSnap = await getDoc(phoneRef);
         
         if (phoneSnap.exists()) {
            return { status: 'INVITED', profile: phoneSnap.data() as UserProfile };
         }
      }

      // Step 4: No profile found
      return { status: 'NEW_USER', profile: null };

    } catch (err: any) {
      console.error("Error checking user status:", err);
      alert(`Firebase DB Error: ${err.message}`);
      // Default to new user on error to allow retry/setup
      return { status: 'NEW_USER', profile: null };
    }
  };

  // Listen to Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in. Check DB.
        const { status, profile } = await checkUserStatus(currentUser);
        setUser(currentUser);
        setUserProfile(profile);
        setUserStatus(status);
      } else {
        // User is signed out.
        setUser(null);
        setUserProfile(null);
        setUserStatus(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithPhone = async (phoneNumber: string, appVerifier: ApplicationVerifier | null) => {
    try {
      // REMOVED: Dev Bypass logic. Always use real Auth.
      
      if (!appVerifier) {
          const msg = "Recaptcha not initialized. Please refresh.";
          alert(msg);
          throw new Error(msg);
      }

      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber.replace(/\D/g, '')}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      confirmationResultRef.current = confirmationResult;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      alert(`Firebase Auth Error: ${error.message}`);
      throw error;
    }
  };

  const verifyOTP = async (otp: string): Promise<UserStatus> => {
    setLoading(true);
    try {
      if (!confirmationResultRef.current) {
        throw new Error("No OTP request found");
      }

      // Confirm OTP (Real)
      const result = await confirmationResultRef.current.confirm(otp);
      const firebaseUser = result.user;
      
      const { status, profile } = await checkUserStatus(firebaseUser);
      
      setUser(firebaseUser);
      setUserProfile(profile);
      setUserStatus(status);

      return status;
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      alert(`Verification Failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setUserStatus(null);
      confirmationResultRef.current = null;
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const updateProfile = async (profileData: UserProfile, companyData?: Partial<BusinessProfile>) => {
    if (!user) return;

    try {
      let finalProfile: UserProfile = { ...profileData, uid: user.uid };

      if (profileData.role === 'business_owner' && companyData) {
         finalProfile = await createOwnerProfile(user.uid, profileData, companyData) as UserProfile;
      } 
      else if (userStatus === 'INVITED' && user.phoneNumber) {
         await createProfile(user.uid, finalProfile);
         const phoneRef = doc(db, 'users', user.phoneNumber);
         await deleteDoc(phoneRef); 
      } 
      else {
         await createProfile(user.uid, finalProfile);
      }
      
      setUserProfile(finalProfile);
      setUserStatus('ACTIVE'); 
    } catch (error: any) {
      console.error("Update Profile Error:", error);
      alert(`Profile Update Failed: ${error.message}`);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      userStatus, 
      loading, 
      loginWithPhone, 
      verifyOTP, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};