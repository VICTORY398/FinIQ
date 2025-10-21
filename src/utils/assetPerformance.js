// Simple asset performance calculation
export const calculateAssetReturn = (assetType, investedAmount, days) => {
  const annualReturns = {
    stocks: 0.15,
    mutualFunds: 0.12,
    gold: 0.08,
    fixedDeposit: 0.07
  };
  
  const annualReturn = annualReturns[assetType] || 0.1;
  const dailyReturn = Math.pow(1 + annualReturn, 1/365) - 1;
  const totalReturn = Math.pow(1 + dailyReturn, days);
  
  return investedAmount * totalReturn;
};