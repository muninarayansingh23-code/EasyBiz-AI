import { doc, getDoc, setDoc, writeBatch, collection } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile, BusinessProfile, UserPermissions } from "../types";

/**
 * Fetches the user profile from Firestore.
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  // REMOVED: Mock Data Bypass
  
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Fetches the business tenant profile from Firestore.
 */
export const getTenant = async (tenantId: string): Promise<BusinessProfile | null> => {
  // REMOVED: Mock Data Bypass

  try {
    const docRef = doc(db, "tenants", tenantId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as BusinessProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
};

/**
 * Generic profile creator (Legacy support)
 */
export const createProfile = async (uid: string, data: Partial<UserProfile>) => {
  // REMOVED: Mock Data Bypass

  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error: any) {
    console.error("Error creating profile:", error);
    alert(`DB Error (createProfile): ${error.message}`);
    throw error;
  }
};

/**
 * 1. Owner Registration Logic
 * Transactions: Create 'tenants' doc, Create 'users' doc.
 */
export const createOwnerProfile = async (uid: string, userData: Partial<UserProfile>, companyData: Partial<BusinessProfile>) => {
  // REMOVED: Mock Data Bypass
  
  const batch = writeBatch(db);

  // References
  const userRef = doc(db, "users", uid);
  const companyRef = doc(collection(db, "tenants")); // Auto-ID for tenant

  const tenantId = companyRef.id;

  // 1. Prepare User Data with Owner Permissions
  const fullUserData: UserProfile = {
    ...userData as UserProfile,
    uid,
    role: 'business_owner',
    tenantId: tenantId,
    is_active: true,
    status: 'active',
    permissions: {
      can_create_ads: true,
      can_view_leads: true,
      can_access_site: true,
      can_view_roi: true,
      can_manage_team: true
    },
    createdAt: new Date().toISOString()
  };

  // 2. Prepare Company Data
  const fullCompanyData: BusinessProfile = {
    ...companyData as BusinessProfile,
    id: tenantId,
    ownerId: uid,
    createdAt: new Date().toISOString(),
    plan: 'free' // Default to free
  };

  // 3. Queue Writes
  batch.set(userRef, fullUserData);
  batch.set(companyRef, fullCompanyData);

  // 4. Commit
  try {
    await batch.commit();
    return fullUserData;
  } catch (error: any) {
    console.error("Transaction failed: ", error);
    alert(`DB Transaction Failed: ${error.message}`);
    throw error;
  }
};

/**
 * 2. Invite Logic
 * Creates a 'users' doc with `phoneNumber` as ID.
 */
export const inviteTeamMember = async (adminUser: UserProfile, inviteData: { name: string; phoneNumber: string; permissions: UserPermissions }) => {
  // REMOVED: Mock Data Bypass

  try {
    // We use the Phone Number as the Document ID for invitations
    // This allows us to look it up before the user has a UID (from Firebase Auth)
    const inviteRef = doc(db, "users", inviteData.phoneNumber);
    
    const newAgentProfile: Partial<UserProfile> = {
      uid: '', // Unknown yet
      phoneNumber: inviteData.phoneNumber,
      name: inviteData.name,
      role: 'agent',
      tenantId: adminUser.tenantId,
      is_active: true, // They are active in terms of employment, but status is invited
      status: 'invited',
      permissions: inviteData.permissions,
      createdAt: new Date().toISOString()
    };

    await setDoc(inviteRef, newAgentProfile);
    return true;
  } catch (error: any) {
    console.error("Error inviting member:", error);
    alert(`DB Error (Invite): ${error.message}`);
    throw error;
  }
};