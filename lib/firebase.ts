import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiayzqc2spxXUf5taQMM-C8zmbGdjn9h8",
  authDomain: "easybiz-ai-fdb39.firebaseapp.com",
  projectId: "easybiz-ai-fdb39",
  storageBucket: "easybiz-ai-fdb39.firebasestorage.app",
  messagingSenderId: "719089106222",
  appId: "1:719089106222:web:c9fe9ef0b2dd2a7db30ebf",
  measurementId: "G-3SHJH5LFFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(console.error);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;