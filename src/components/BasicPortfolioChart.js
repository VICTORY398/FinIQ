import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const BasicPortfolioChart = ({ userProfile }) => {
  if (!userProfile?.portfolio?.length) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Investments Yet</h3>
        <p className="text-gray-500">Start investing to see your portfolio</p>
      </div>
    );
  }

  const totalInvested = userProfile.portfolio.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalCurrent = userProfile.portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = totalCurrent - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested * 100) : 0;
  const isProfit = totalReturn >= 0;

  const assets = userProfile.portfolio.reduce((acc, inv) => {
    const type = inv.assetType;
    if (!acc[type]) {
      acc[type] = { name: type, value: 0, count: 0 };
    }
    acc[type].value += inv.currentValue;
    acc[type].count += 1;
    return acc;
  }, {});

  const assetNames = {
    stocks: 'Stocks',
    mutualFunds: 'Mutual Funds',
    gold: 'Gold',
    fixedDeposit: 'Fixed Deposit'
  };

  const assetColors = {
    stocks: '#EF4444',
    mutualFunds: '#3B82F6',
    gold: '#F59E0B',
    fixedDeposit: '#8B5CF6'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main Portfolio Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Portfolio Overview</h2>
        
        {/* Portfolio Value */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            ₹{totalCurrent.toLocaleString('en-IN')}
          </div>
          <div className={`flex items-center justify-center space-x-2 text-lg font-medium ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}>
            {isProfit ? <FaArrowUp /> : <FaArrowDown />}
            <span>{isProfit ? '+' : ''}₹{Math.abs(totalReturn).toLocaleString('en-IN')}</span>
            <span>({isProfit ? '+' : ''}{returnPercentage.toFixed(1)}%)</span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleString('en-IN')}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Invested</div>
            <div className="text-xl font-semibold">₹{totalInvested.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Assets</div>
            <div className="text-xl font-semibold">{userProfile.portfolio.length}</div>
          </div>
        </div>

        {/* Asset Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Investments</h3>
          <div className="space-y-3">
            {Object.entries(assets).map(([type, data]) => {
              const percentage = (data.value / totalCurrent * 100).toFixed(1);
              return (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: assetColors[type] || '#6B7280' }}
                    ></div>
                    <div>
                      <div className="font-medium">{assetNames[type] || type}</div>
                      <div className="text-sm text-gray-500">{data.count} investment{data.count > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{data.value.toLocaleString('en-IN')}</div>
                    <div className="text-sm text-gray-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicPortfolioChart;