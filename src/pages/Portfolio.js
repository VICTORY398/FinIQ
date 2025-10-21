import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { updateUserProfile } from '../utils/userService';
import AssetPerformanceChart from '../components/AssetPerformanceChart';
import RealTimePortfolioChart from '../components/RealTimePortfolioChart';
import { FaPlus, FaMinus, FaChartLine, FaCoins, FaHistory } from 'react-icons/fa';

const Portfolio = ({ user, userProfile, setUserProfile }) => {
  const [selectedAsset, setSelectedAsset] = useState('stocks');
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [showInvestForm, setShowInvestForm] = useState(false);

  const assetTypes = {
    stocks: { name: 'Stocks', icon: '📈', color: '#4a90e2', expectedReturn: 15 },
    mutualFunds: { name: 'Mutual Funds', icon: '📊', color: '#2cae77', expectedReturn: 12 },
    gold: { name: 'Gold', icon: '🥇', color: '#ffc107', expectedReturn: 8 },
    fixedDeposit: { name: 'Fixed Deposit', icon: '🏦', color: '#17a2b8', expectedReturn: 7 }
  };

  const stockOptions = [
    'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'SBIN', 'ITC', 'HINDUNILVR', 'LT', 'BAJFINANCE'
  ];

  const mutualFundOptions = [
    'SBI Bluechip Fund', 'HDFC Top 100', 'ICICI Prudential Value Discovery', 'Axis Bluechip Fund', 'Mirae Asset Large Cap'
  ];





  const handleInvestment = async () => {
    const currentBalance = userProfile?.virtualBalance ?? 10000;
    if (investmentAmount > currentBalance) {
      alert(`Insufficient balance! You have ₹${currentBalance.toLocaleString()}`);
      return;
    }

    const assetName = selectedAsset === 'stocks' ? selectedStock : 
                     selectedAsset === 'mutualFunds' ? mutualFundOptions[0] : 
                     assetTypes[selectedAsset].name;

    const newInvestment = {
      id: `${user.uid}_${Date.now()}`, // Unique ID with user prefix
      userId: user.uid, // Link to user
      assetType: selectedAsset,
      assetName,
      investedAmount: investmentAmount,
      currentValue: investmentAmount,
      profitLoss: 0,
      investmentDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      quantity: selectedAsset === 'stocks' ? Math.floor(investmentAmount / 100) : investmentAmount,
      historicalValues: [{ date: new Date().toISOString(), value: investmentAmount }] // Track history
    };

    const updatedPortfolio = [...(currentProfile.portfolio || []), newInvestment];
    const newBalance = (currentProfile.virtualBalance || 10000) - investmentAmount;
    const newTotalInvested = (currentProfile.totalInvested || 0) + investmentAmount;

    const updatedProfile = {
      ...currentProfile,
      portfolio: updatedPortfolio,
      virtualBalance: newBalance,
      totalInvested: newTotalInvested,
      lastUpdated: new Date().toISOString()
    };

    // Update local state immediately
    setUserProfile(updatedProfile);
    
    // Save to database
    if (user?.uid) {
      try {
        await updateUserProfile(user.uid, updatedProfile);
        console.log('Investment saved successfully');
      } catch (error) {
        console.error('Error saving investment:', error);
        alert('Investment saved locally. Will sync when connection is restored.');
      }
    }

    setShowInvestForm(false);
    setInvestmentAmount(1000);
  };

  const sellInvestment = async (investmentId) => {
    const investment = currentProfile.portfolio.find(inv => inv.id === investmentId);
    if (!investment) return;

    const updatedPortfolio = currentProfile.portfolio.filter(inv => inv.id !== investmentId);
    const newBalance = (currentProfile.virtualBalance || 10000) + investment.currentValue;
    const newTotalReturns = (currentProfile.totalReturns || 0) + investment.profitLoss;

    const updatedProfile = {
      ...currentProfile,
      portfolio: updatedPortfolio,
      virtualBalance: newBalance,
      totalReturns: newTotalReturns,
      lastUpdated: new Date().toISOString()
    };

    // Update local state immediately
    setUserProfile(updatedProfile);
    
    // Save to database
    if (user?.uid) {
      try {
        await updateUserProfile(user.uid, updatedProfile);
        console.log('Investment sold successfully');
      } catch (error) {
        console.error('Error selling investment:', error);
        alert('Sale completed locally. Will sync when connection is restored.');
      }
    }
  };

  const currentProfile = userProfile || { virtualBalance: 10000, portfolio: [], goals: [] };
  const totalPortfolioValue = currentProfile.portfolio?.reduce((sum, inv) => sum + inv.currentValue, 0) || 0;
  const totalProfitLoss = currentProfile.portfolio?.reduce((sum, inv) => sum + inv.profitLoss, 0) || 0;
  const totalInvested = currentProfile.portfolio?.reduce((sum, inv) => sum + inv.investedAmount, 0) || 0;

  // This section is now handled by RealTimePortfolioChart component

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            💼 Virtual Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Practice investing with virtual money - Learn without risk!
          </p>
        </motion.div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <FaCoins className="text-3xl text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              ₹{(currentProfile.virtualBalance || 10000).toLocaleString()}
            </div>
            <div className="text-gray-600">Available Balance</div>
          </motion.div>

          <motion.div
            className="card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaChartLine className="text-3xl text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              ₹{totalPortfolioValue.toLocaleString()}
            </div>
            <div className="text-gray-600">Portfolio Value</div>
          </motion.div>

          <motion.div
            className="card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-gray-800">
              ₹{totalInvested.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Invested</div>
          </motion.div>

          <motion.div
            className="card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl mb-2">{totalProfitLoss >= 0 ? '📈' : '📉'}</div>
            <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}₹{totalProfitLoss.toLocaleString()}
            </div>
            <div className="text-gray-600">P&L</div>
          </motion.div>
        </div>

        {/* Real-time Investment Tracking */}
        <RealTimePortfolioChart 
          userProfile={currentProfile} 
          onUpdateProfile={(updatedProfile) => {
            setUserProfile(updatedProfile);
            // Periodically save to database
            if (Math.random() < 0.1 && user?.uid) {
              updateUserProfile(user.uid, { portfolio: updatedProfile.portfolio }).catch(console.error);
            }
          }}
        />

        {/* Investment Form */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Make Investment</h3>
            <button
              onClick={() => setShowInvestForm(!showInvestForm)}
              className="btn-primary flex items-center space-x-2"
            >
              <FaPlus />
              <span>New Investment</span>
            </button>
          </div>

          {showInvestForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(assetTypes).map(([key, asset]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAsset(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedAsset === key
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <div className="text-2xl mb-2">{asset.icon}</div>
                    <div className="font-semibold">{asset.name}</div>
                    <div className="text-sm opacity-75">{asset.expectedReturn}% return</div>
                  </button>
                ))}
              </div>

              {selectedAsset === 'stocks' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Stock
                  </label>
                  <select
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    {stockOptions.map(stock => (
                      <option key={stock} value={stock}>{stock}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount: ₹{investmentAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100"
                  max={currentProfile.virtualBalance || 10000}
                  step="100"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹100</span>
                  <span>₹{(currentProfile.virtualBalance || 10000).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleInvestment}
                  className="btn-primary flex-1"
                >
                  Invest Now
                </button>
                <button
                  onClick={() => setShowInvestForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Portfolio Holdings */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Holdings</h3>
          
          {currentProfile.portfolio?.length > 0 ? (
            <div className="space-y-6">
              {currentProfile.portfolio.map((investment) => (
                <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{assetTypes[investment.assetType]?.icon}</div>
                      <div>
                        <div className="font-semibold">{investment.assetName}</div>
                        <div className="text-sm text-gray-600">
                          Invested: ₹{investment.investedAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">₹{investment.currentValue.toLocaleString()}</div>
                      <div className={`text-sm ${investment.profitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {investment.profitLoss >= 0 ? '+' : ''}₹{investment.profitLoss.toLocaleString()}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => sellInvestment(investment.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaMinus />
                      <span>Sell</span>
                    </button>
                  </div>
                  
                  {/* 5-Year Performance Chart */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaHistory className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">5-Year Performance</span>
                    </div>
                    <AssetPerformanceChart 
                      assetType={investment.assetType} 
                      assetName={investment.assetName}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No investments yet</h4>
              <p className="text-gray-500">Start your investment journey by clicking "New Investment"</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;