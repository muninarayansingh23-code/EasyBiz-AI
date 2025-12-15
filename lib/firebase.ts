import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzgZRhveqavaubRbMhCGuJoxs9NTlqcEA",
  authDomain: "easybiz-ai-72a6a.firebaseapp.com",
  projectId: "easybiz-ai-72a6a",
  storageBucket: "easybiz-ai-72a6a.firebasestorage.app",
  messagingSenderId: "317413849408",
  appId: "1:317413849408:web:d3d4670e44fc17076862a5",
  measurementId: "G-BCXWMNR5SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally to prevent errors if not supported
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