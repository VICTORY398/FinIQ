import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InteractiveInvestmentChart = () => {
  const [selectedAsset, setSelectedAsset] = useState('all');
  const [timeframe, setTimeframe] = useState('5Y');
  const [investmentAmount, setInvestmentAmount] = useState(100000);

  const assets = {
    gold: { name: 'Gold', color: '#F59E0B', icon: '🥇', return: 9, currentValue: 154000 },
    savings: { name: 'Savings Account', color: '#10B981', icon: '🏦', return: 4, currentValue: 122000 },
    mutualFunds: { name: 'Mutual Funds', color: '#3B82F6', icon: '📊', return: 12, currentValue: 176000 },
    fixedDeposit: { name: 'Fixed Deposit', color: '#8B5CF6', icon: '💰', return: 7, currentValue: 140000 },
    stocks: { name: 'Stocks', color: '#EF4444', icon: '📈', return: 15, currentValue: 201000 }
  };

  const timeframes = {
    '1Y': { label: '1 Year', months: 12 },
    '3Y': { label: '3 Years', months: 36 },
    '5Y': { label: '5 Years', months: 60 }
  };

  const generateData = (assetKey, months) => {
    const asset = assets[assetKey];
    const monthlyReturn = Math.pow(1 + asset.return / 100, 1/12) - 1;
    const data = [];
    
    for (let i = 0; i <= months; i++) {
      let value = investmentAmount;
      if (i > 0) {
        value = investmentAmount * Math.pow(1 + monthlyReturn, i);
        // Add realistic volatility
        if (assetKey !== 'savings' && assetKey !== 'fixedDeposit') {
          const volatility = assetKey === 'gold' ? 0.02 : 0.03;
          const randomFactor = (Math.sin(i * 0.5) + Math.random() - 0.5) * volatility;
          value *= (1 + randomFactor);
        }
      }
      data.push(Math.round(value));
    }
    return data;
  };

  const createChartData = () => {
    const months = timeframes[timeframe].months;
    const labels = Array.from({ length: months + 1 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - months + i);
      return date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    });

    const datasets = [];
    
    if (selectedAsset === 'all') {
      Object.entries(assets).forEach(([key, asset]) => {
        datasets.push({
          label: asset.name,
          data: generateData(key, months),
          borderColor: asset.color,
          backgroundColor: `${asset.color}20`,
          tension: 0.4,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2
        });
      });
    } else {
      const asset = assets[selectedAsset];
      datasets.push({
        label: asset.name,
        data: generateData(selectedAsset, months),
        borderColor: asset.color,
        backgroundColor: `${asset.color}20`,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 3
      });
    }

    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: selectedAsset === 'all',
        position: 'top',
        labels: { usePointStyle: true, padding: 20 }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const profit = value - investmentAmount;
            const percentage = ((profit / investmentAmount) * 100).toFixed(1);
            return `${context.dataset.label}: ₹${value.toLocaleString()} (${percentage >= 0 ? '+' : ''}${percentage}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 8 }
      },
      y: {
        grid: { color: '#f0f0f0' },
        ticks: {
          callback: (value) => `₹${(value/1000).toFixed(0)}K`
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const getFinalValues = () => {
    const months = timeframes[timeframe].months;
    return Object.entries(assets).map(([key, asset]) => {
      const data = generateData(key, months);
      const finalValue = data[data.length - 1];
      const profit = finalValue - investmentAmount;
      const percentage = ((profit / investmentAmount) * 100).toFixed(1);
      return { key, asset, finalValue, profit, percentage };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Investment Comparison</h3>
        <div className="flex space-x-2">
          {Object.entries(timeframes).map(([key, tf]) => (
            <button
              key={key}
              onClick={() => setTimeframe(key)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                timeframe === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Investment Amount: ₹{investmentAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="10000"
          max="1000000"
          step="10000"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedAsset('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedAsset === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Compare All
        </button>
        {Object.entries(assets).map(([key, asset]) => (
          <button
            key={key}
            onClick={() => setSelectedAsset(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              selectedAsset === key
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedAsset === key ? asset.color : undefined
            }}
          >
            <span>{asset.icon}</span>
            <span>{asset.name}</span>
          </button>
        ))}
      </div>

      <div className="h-80 mb-6">
        <Line 
          data={createChartData()} 
          options={chartOptions}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {getFinalValues().map(({ key, asset, finalValue, profit, percentage }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer"
            onClick={() => setSelectedAsset(key)}
          >
            <div className="text-2xl mb-2">{asset.icon}</div>
            <div className="font-semibold text-gray-800 text-sm">{asset.name}</div>
            <div className="text-lg font-bold" style={{ color: asset.color }}>
              ₹{finalValue.toLocaleString()}
            </div>
            <div className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit >= 0 ? '+' : ''}₹{profit.toLocaleString()} ({percentage}%)
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {asset.return}% annual return
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InteractiveInvestmentChart;