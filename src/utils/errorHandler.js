// Centralized error handling for Firebase and app errors
export const handleFirebaseError = (error) => {
  const errorMessages = {
    'auth/internal-error': 'Connection issue. Please check your internet and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'Email already registered. Try signing in.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
    'firestore/permission-denied': 'Access denied. Please sign in again.',
    'firestore/unavailable': 'Database temporarily unavailable. Please try again.',
    'firestore/deadline-exceeded': 'Request timeout. Please try again.'
  };

  return errorMessages[error.code] || 'An unexpected error occurred. Please try again.';
};

export const logError = (error, context = '') => {
  // In production, you might want to send this to an error tracking service
  if (process.env.NODE_ENV === 'development') {
    console.error(`Error in ${context}:`, error);
  }
};

export const isNetworkError = (error) => {
  return error.code === 'auth/network-request-failed' || 
         error.code === 'auth/internal-error' ||
         error.message?.includes('network') ||
         error.message?.includes('connection');
};