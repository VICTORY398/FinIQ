import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaCircle } from 'react-icons/fa';
import { calculateRealisticReturn } from '../utils/marketSimulation';

const RealTimePortfolioChart = ({ userProfile, onUpdateProfile }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [previousValues, setPreviousValues] = useState({});
  const intervalRef = useRef(null);

  const assetTypes = {
    stocks: { name: 'Stocks', color: '#EF4444', volatility: 0.015, trend: 0.0001 },
    mutualFunds: { name: 'Mutual Funds', color: '#3B82F6', volatility: 0.008, trend: 0.00008 },
    gold: { name: 'Gold', color: '#F59E0B', volatility: 0.005, trend: 0.00005 },
    fixedDeposit: { name: 'Fixed Deposit', color: '#8B5CF6', volatility: 0, trend: 0.00019 }
  };

  useEffect(() => {
    if (userProfile?.portfolio?.length) {
      initializePortfolioData();
      startRealTimeUpdates();
    } else {
      stopRealTimeUpdates();
    }

    return () => stopRealTimeUpdates();
  }, [userProfile?.portfolio]);

  const initializePortfolioData = () => {
    const data = calculatePortfolioMetrics(userProfile.portfolio);
    setPortfolioData(data);
    setPreviousValues({
      totalValue: data.totalValue,
      totalPL: data.totalPL,
      assets: data.assets
    });
  };

  const startRealTimeUpdates = () => {
    stopRealTimeUpdates();
    intervalRef.current = setInterval(() => {
      updatePortfolioValues();
    }, 2000);
  };

  const stopRealTimeUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const simulateMarketChange = (assetType, currentValue, investedAmount) => {
    return calculateRealisticReturn(assetType, currentValue, investedAmount);
  };

  const updatePortfolioValues = () => {
    if (!userProfile?.portfolio?.length) return;

    const updatedPortfolio = userProfile.portfolio.map(investment => {
      const newValue = simulateMarketChange(
        investment.assetType,
        investment.currentValue,
        investment.investedAmount
      );

      return {
        ...investment,
        currentValue: newValue,
        profitLoss: newValue - investment.investedAmount,
        lastUpdated: new Date().toISOString()
      };
    });

    const newData = calculatePortfolioMetrics(updatedPortfolio);
    
    setPreviousValues({
      totalValue: portfolioData?.totalValue || 0,
      totalPL: portfolioData?.totalPL || 0,
      assets: portfolioData?.assets || {}
    });
    
    setPortfolioData(newData);

    // Update parent component
    if (onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        portfolio: updatedPortfolio
      });
    }
  };

  const calculatePortfolioMetrics = (portfolio) => {
    const totalInvested = portfolio.reduce((sum, inv) => sum + inv.investedAmount, 0);
    const totalValue = portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalPL = totalValue - totalInvested;

    const assets = {};
    portfolio.forEach(inv => {
      const type = inv.assetType;
      if (!assets[type]) {
        assets[type] = {
          name: assetTypes[type]?.name || type,
          color: assetTypes[type]?.color || '#6B7280',
          invested: 0,
          current: 0,
          pl: 0,
          count: 0
        };
      }
      assets[type].invested += inv.investedAmount;
      assets[type].current += inv.currentValue;
      assets[type].pl += inv.profitLoss;
      assets[type].count += 1;
    });

    return {
      totalInvested,
      totalValue,
      totalPL,
      returnPercentage: totalInvested > 0 ? (totalPL / totalInvested * 100) : 0,
      assets
    };
  };

  const getChangeIndicator = (current, previous) => {
    if (!previous) return null;
    const change = current - previous;
    if (Math.abs(change) < 0.01) return null;
    
    return (
      <motion.span
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`ml-2 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}
      >
        {change >= 0 ? <FaArrowUp className="inline" /> : <FaArrowDown className="inline" />}
        {Math.abs(change).toFixed(2)}
      </motion.span>
    );
  };

  if (!portfolioData) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Investments Yet</h3>
        <p className="text-gray-500">Start investing to see real-time portfolio tracking</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main Portfolio Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Live Portfolio</h2>
          <div className="flex items-center space-x-2">
            <FaCircle className="w-2 h-2 text-green-500 animate-pulse" />
            <span className="text-sm text-gray-500">Live</span>
          </div>
        </div>
        
        {/* Portfolio Value */}
        <div className="text-center mb-6">
          <motion.div 
            key={portfolioData.totalValue}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            ₹{portfolioData.totalValue.toLocaleString('en-IN')}
            {getChangeIndicator(portfolioData.totalValue, previousValues.totalValue)}
          </motion.div>
          
          <motion.div 
            key={portfolioData.totalPL}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className={`flex items-center justify-center space-x-2 text-lg font-medium ${
              portfolioData.totalPL >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {portfolioData.totalPL >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            <span>{portfolioData.totalPL >= 0 ? '+' : ''}₹{Math.abs(portfolioData.totalPL).toLocaleString('en-IN')}</span>
            <span>({portfolioData.totalPL >= 0 ? '+' : ''}{portfolioData.returnPercentage.toFixed(2)}%)</span>
            {getChangeIndicator(portfolioData.totalPL, previousValues.totalPL)}
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Invested</div>
            <div className="text-xl font-semibold">₹{portfolioData.totalInvested.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Assets</div>
            <div className="text-xl font-semibold">{Object.keys(portfolioData.assets).length}</div>
          </div>
        </div>

        {/* Asset Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Asset Performance</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {Object.entries(portfolioData.assets).map(([type, data]) => {
                const percentage = (data.current / portfolioData.totalValue * 100).toFixed(1);
                const prevData = previousValues.assets?.[type];
                
                return (
                  <motion.div 
                    key={type}
                    layout
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: data.color }}
                      ></div>
                      <div>
                        <div className="font-medium">{data.name}</div>
                        <div className="text-sm text-gray-500">{data.count} investment{data.count > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        key={data.current}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        className="font-semibold"
                      >
                        ₹{data.current.toLocaleString('en-IN')}
                        {getChangeIndicator(data.current, prevData?.current)}
                      </motion.div>
                      <div className="text-sm text-gray-500">{percentage}%</div>
                      <motion.div 
                        key={data.pl}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        className={`text-sm ${data.pl >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {data.pl >= 0 ? '+' : ''}₹{data.pl.toLocaleString('en-IN')}
                        {getChangeIndicator(data.pl, prevData?.pl)}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RealTimePortfolioChart;