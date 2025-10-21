import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AssetPerformanceChart = ({ assetType, assetName }) => {
  const generateSimpleData = () => {
    const months = 12;
    const labels = [];
    const data = [];
    let value = 100;
    
    const returns = {
      stocks: 0.15,
      mutualFunds: 0.12,
      gold: 0.08,
      fixedDeposit: 0.07
    };
    
    const monthlyReturn = Math.pow(1 + (returns[assetType] || 0.1), 1/12) - 1;
    
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - months + i);
      labels.push(date.toLocaleDateString('en-IN', { month: 'short' }));
      
      if (i > 0) {
        const volatility = (Math.random() - 0.5) * 0.1;
        value *= (1 + monthlyReturn + volatility);
      }
      data.push(value);
    }
    
    return { labels, data };
  };
  
  const { labels, data } = generateSimpleData();
  
  const chartData = {
    labels,
    datasets: [{
      label: assetName,
      data,
      borderColor: getAssetColor(assetType),
      backgroundColor: `${getAssetColor(assetType)}20`,
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const returnPct = ((context.parsed.y - 100)).toFixed(1);
            return `${returnPct >= 0 ? '+' : ''}${returnPct}% return`;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: '#f0f0f0' },
        ticks: { callback: (value) => `${(value - 100).toFixed(0)}%` }
      }
    }
  };

  return (
    <div className="h-48">
      <Line data={chartData} options={options} />
    </div>
  );
};

const getAssetColor = (assetType) => {
  const colors = {
    stocks: '#EF4444',
    mutualFunds: '#3B82F6',
    gold: '#F59E0B',
    fixedDeposit: '#10B981'
  };
  return colors[assetType] || '#6B7280';
};

export default AssetPerformanceChart;