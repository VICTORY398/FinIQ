import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const initializeUserProfile = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      const initialProfile = {
        name: user.displayName || '',
        email: user.email,
        virtualBalance: 10000,
        portfolio: [],
        goals: [],
        createdAt: new Date(),
        lastLogin: new Date(),
        achievements: [],
        totalInvested: 0,
        totalReturns: 0
      };
      await setDoc(userRef, initialProfile);
      return initialProfile;
    } else {
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
      return userDoc.data();
    }
  } catch (error) {

    return {
      name: user.displayName || '',
      email: user.email,
      virtualBalance: 10000,
      portfolio: [],
      goals: [],
      totalInvested: 0,
      totalReturns: 0
    };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {

    return null;
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    const updateData = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    
    // Ensure portfolio data integrity
    if (updateData.portfolio) {
      updateData.portfolio = updateData.portfolio.map(investment => ({
        ...investment,
        userId: userId, // Ensure user linkage
        lastUpdated: investment.lastUpdated || new Date().toISOString()
      }));
    }
    
    await updateDoc(userRef, updateData);

  } catch (error) {

    throw error;
  }
};

export const simulateReturns = (assetType) => {
  const returns = {
    stocks: (Math.random() - 0.5) * 0.04, // ±2% daily variation
    gold: (Math.random() - 0.5) * 0.015, // ±0.75% daily
    mutualFunds: (Math.random() - 0.5) * 0.02, // ±1% daily
    fixedDeposit: 0.00019 // ~7% annual = 0.019% daily (fixed positive)
  };
  return returns[assetType] || 0;
};

export const calculatePortfolioReturns = async (userId) => {
  let profile = null;
  try {
    profile = await getUserProfile(userId);
    if (!profile?.portfolio?.length) return profile;

    const updatedPortfolio = profile.portfolio.map(investment => {
      const investmentDate = new Date(investment.investmentDate);
      const lastUpdate = new Date(investment.lastUpdated || investment.investmentDate);
      const today = new Date();
      
      // Only calculate returns if more than 1 hour has passed
      const hoursDiff = (today - lastUpdate) / (1000 * 60 * 60);
      if (hoursDiff < 1) return investment;
      
      const daysDiff = Math.floor((today - investmentDate) / (1000 * 60 * 60 * 24));
      
      // Calculate realistic returns based on time and asset type
      let cumulativeReturn = 1;
      for (let i = 0; i < daysDiff; i++) {
        const dailyReturn = simulateReturns(investment.assetType);
        cumulativeReturn *= (1 + dailyReturn);
      }
      
      const newValue = investment.investedAmount * cumulativeReturn;
      
      // Update historical values
      const historicalValues = investment.historicalValues || [];
      historicalValues.push({ 
        date: today.toISOString(), 
        value: newValue 
      });
      
      // Keep only last 30 days of history
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const filteredHistory = historicalValues.filter(h => new Date(h.date) > thirtyDaysAgo);
      
      return {
        ...investment,
        currentValue: Math.max(0, newValue),
        profitLoss: newValue - investment.investedAmount,
        lastUpdated: today.toISOString(),
        historicalValues: filteredHistory
      };
    });

    const updatedProfile = { ...profile, portfolio: updatedPortfolio };
    await updateUserProfile(userId, updatedProfile);
    return updatedProfile;
  } catch (error) {
    return profile;
  }
};

// Add function to get portfolio history for charts
export const getPortfolioHistory = (portfolio) => {
  if (!portfolio?.length) return [];
  
  const allDates = new Set();
  portfolio.forEach(investment => {
    if (investment.historicalValues) {
      investment.historicalValues.forEach(h => allDates.add(h.date));
    }
  });
  
  const sortedDates = Array.from(allDates).sort();
  
  return sortedDates.map(date => {
    const totalValue = portfolio.reduce((sum, investment) => {
      const historicalValue = investment.historicalValues?.find(h => h.date === date);
      return sum + (historicalValue?.value || investment.investedAmount);
    }, 0);
    
    return { date, value: totalValue };
  });
};