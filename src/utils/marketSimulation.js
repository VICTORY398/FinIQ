// Market simulation utilities for realistic portfolio behavior
export const getMarketSentiment = () => {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  
  // Market hours effect (9 AM to 4 PM IST)
  const isMarketHours = hour >= 9 && hour <= 16;
  const isWeekend = day === 0 || day === 6;
  
  let sentiment = 0;
  
  // Market opening/closing effects
  if (hour === 9) sentiment += 0.002; // Opening rally
  if (hour === 15) sentiment -= 0.001; // Pre-close selling
  
  // Weekend effect
  if (isWeekend) sentiment *= 0.1;
  
  // Market hours multiplier
  if (!isMarketHours) sentiment *= 0.3;
  
  return sentiment;
};

export const simulateNewsEvents = () => {
  // Simulate random news events that affect market
  const events = [
    { probability: 0.001, impact: 0.02, type: 'positive' }, // Major positive news
    { probability: 0.001, impact: -0.015, type: 'negative' }, // Major negative news
    { probability: 0.005, impact: 0.005, type: 'minor_positive' }, // Minor positive
    { probability: 0.005, impact: -0.005, type: 'minor_negative' } // Minor negative
  ];
  
  let totalImpact = 0;
  events.forEach(event => {
    if (Math.random() < event.probability) {
      totalImpact += event.impact;
    }
  });
  
  return totalImpact;
};

export const getAssetCorrelation = (assetType, marketSentiment) => {
  // Different assets react differently to market sentiment
  const correlations = {
    stocks: 1.0, // Highly correlated with market
    mutualFunds: 0.8, // Moderately correlated
    gold: -0.3, // Inverse correlation (safe haven)
    fixedDeposit: 0.0 // No correlation (fixed returns)
  };
  
  return marketSentiment * (correlations[assetType] || 0);
};

export const calculateRealisticReturn = (assetType, currentValue, investedAmount) => {
  const baseReturns = {
    stocks: 0.00015, // ~15% annual
    mutualFunds: 0.00012, // ~12% annual
    gold: 0.00008, // ~8% annual
    fixedDeposit: 0.00019 // ~7% annual (fixed)
  };
  
  const volatilities = {
    stocks: 0.015, // 1.5% daily volatility
    mutualFunds: 0.008, // 0.8% daily volatility
    gold: 0.005, // 0.5% daily volatility
    fixedDeposit: 0 // No volatility
  };
  
  // Base return
  let totalReturn = baseReturns[assetType] || 0;
  
  // Add market sentiment
  const marketSentiment = getMarketSentiment();
  totalReturn += getAssetCorrelation(assetType, marketSentiment);
  
  // Add news events
  totalReturn += simulateNewsEvents();
  
  // Add volatility
  const volatility = (Math.random() - 0.5) * (volatilities[assetType] || 0);
  totalReturn += volatility;
  
  // Calculate new value
  const newValue = currentValue * (1 + totalReturn);
  
  // Apply realistic bounds
  const maxValue = investedAmount * 1.8; // Max 80% gain
  const minValue = investedAmount * 0.6; // Max 40% loss
  
  return Math.max(minValue, Math.min(maxValue, newValue));
};