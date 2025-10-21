import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDagm_Mol76u7sbBKDTufZI2L99FgQlC-s",
  authDomain: "finiq-17bbf.firebaseapp.com",
  projectId: "finiq-17bbf",
  storageBucket: "finiq-17bbf.firebasestorage.app",
  messagingSenderId: "611619888235",
  appId: "1:611619888235:web:fdb9de0df5d09bdf4e652e",
  measurementId: "G-XD0TR4NLMP"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // Handle initialization error
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;