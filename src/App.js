import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import { getUserProfile, initializeUserProfile, calculatePortfolioReturns } from './utils/userService';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Portfolio from './pages/Portfolio';
import Goals from './pages/Goals';
import ScamAwareness from './pages/ScamAwareness';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        let profile = await getUserProfile(user.uid);
        if (!profile) {
          profile = await initializeUserProfile(user);
        } else {
          // Calculate updated returns when user logs in
          profile = await calculatePortfolioReturns(user.uid);
        }
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    // Auth state change will be handled by onAuthStateChanged
  };

  const renderCurrentPage = () => {
    const pageProps = { user, userProfile, setUserProfile, setCurrentPage };
    
    switch (currentPage) {
      case 'learn':
        return <Learn {...pageProps} />;
      case 'portfolio':
        return <Portfolio {...pageProps} />;
      case 'goals':
        return <Goals {...pageProps} />;
      case 'scam':
        return <ScamAwareness {...pageProps} />;
      default:
        return <Dashboard {...pageProps} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading FinQuest...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;