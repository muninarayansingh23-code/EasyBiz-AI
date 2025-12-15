import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile, BusinessProfile } from "../types";

/**
 * Fetches the user profile from Firestore 'users' collection.
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log("No such user profile!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Fetches the business tenant profile from Firestore 'businesses' collection.
 */
export const getTenant = async (tenantId: string): Promise<BusinessProfile | null> => {
  try {
    const docRef = doc(db, "businesses", tenantId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as BusinessProfile;
    } else {
      console.log("No such tenant!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
};

/**
 * Creates or updates a user profile in Firestore.
 */
export const createProfile = async (uid: string, data: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, "users", uid);
    // Merge true allows us to update fields without overwriting the whole doc
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};
