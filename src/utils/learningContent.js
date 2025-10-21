export const learningModules = {
  basics: {
    title: 'Investment Basics',
    icon: '📚',
    modules: [
      {
        id: 'risk-return',
        title: 'Risk & Return',
        content: 'Higher returns come with higher risk. Learn to balance both.',
        details: 'Risk is the possibility of losing money. Return is the profit you make. Generally, investments with higher potential returns also have higher risk.',
        examples: ['FD: Low risk, 6-7% return', 'Stocks: High risk, 12-15% return'],
        quiz: { question: 'Which has higher risk?', options: ['Fixed Deposit', 'Stocks'], answer: 1 }
      },
      {
        id: 'diversification',
        title: 'Diversification',
        content: 'Don\'t put all eggs in one basket - spread your investments.',
        details: 'Diversification means investing in different types of assets to reduce risk. If one investment performs poorly, others may perform well.',
        examples: ['Mix of stocks, bonds, gold', '60% stocks, 30% bonds, 10% gold'],
        quiz: { question: 'Diversification helps to?', options: ['Increase returns', 'Reduce risk'], answer: 1 }
      }
    ]
  },
  stockAnalysis: {
    title: 'Stock Analysis',
    icon: '📈',
    modules: [
      {
        id: 'fundamental-analysis',
        title: 'Fundamental Analysis',
        content: 'Analyze company\'s financial health, revenue, profit margins.',
        details: 'Look at P/E ratio, debt-to-equity, revenue growth, profit margins. A good company has consistent growth and low debt.',
        examples: ['P/E < 25 is generally good', 'Debt/Equity < 1 is safer'],
        quiz: { question: 'Lower P/E ratio means?', options: ['Expensive stock', 'Cheaper stock'], answer: 1 }
      },
      {
        id: 'technical-analysis',
        title: 'Technical Analysis',
        content: 'Study price charts, trends, and trading volumes.',
        details: 'Technical analysis uses charts to predict future price movements based on past patterns and trading volume.',
        examples: ['Support & Resistance levels', 'Moving averages', 'RSI indicator'],
        quiz: { question: 'Technical analysis focuses on?', options: ['Company financials', 'Price charts'], answer: 1 }
      }
    ]
  },
  safeInvesting: {
    title: 'Safe Investing',
    icon: '🛡️',
    modules: [
      {
        id: 'emergency-fund',
        title: 'Emergency Fund First',
        content: 'Keep 6-12 months expenses in savings before investing.',
        details: 'Emergency fund protects you from selling investments during tough times. Keep it in liquid savings or FD.',
        examples: ['Monthly expense ₹30k → Emergency fund ₹2-3L', 'Keep in savings account or liquid fund'],
        quiz: { question: 'Emergency fund should be?', options: ['3 months expenses', '6-12 months expenses'], answer: 1 }
      },
      {
        id: 'sip-investing',
        title: 'SIP - Systematic Investment',
        content: 'Invest fixed amount regularly to average out market volatility.',
        details: 'SIP helps you buy more units when prices are low and fewer when high, averaging your purchase cost.',
        examples: ['₹5000 monthly SIP in mutual fund', 'Rupee cost averaging benefit'],
        quiz: { question: 'SIP helps in?', options: ['Timing the market', 'Averaging purchase cost'], answer: 1 }
      }
    ]
  },
  marketBasics: {
    title: 'Stock Market Basics',
    icon: '🏛️',
    modules: [
      {
        id: 'how-market-works',
        title: 'How Stock Market Works',
        content: 'Companies sell shares to raise money, investors buy/sell shares.',
        details: 'Stock market is where company shares are traded. BSE and NSE are India\'s main exchanges. Prices change based on demand-supply.',
        examples: ['BSE: Bombay Stock Exchange', 'NSE: National Stock Exchange', 'Sensex tracks top 30 companies'],
        quiz: { question: 'Sensex tracks how many companies?', options: ['30', '50'], answer: 0 }
      },
      {
        id: 'demat-account',
        title: 'Demat Account',
        content: 'Digital account to hold your shares electronically.',
        details: 'Demat account stores your shares digitally. You need it to buy/sell stocks. Choose broker with low fees.',
        examples: ['Zerodha, Groww, Angel One', 'Annual charges: ₹200-500', 'Trading charges: ₹10-20 per order'],
        quiz: { question: 'Demat account is used for?', options: ['Holding cash', 'Holding shares'], answer: 1 }
      }
    ]
  },
  investmentTypes: {
    title: 'Investment Types',
    icon: '💼',
    modules: [
      {
        id: 'mutual-funds',
        title: 'Mutual Funds',
        content: 'Professional fund managers invest your money in diversified portfolio.',
        details: 'Mutual funds pool money from many investors and invest in stocks/bonds. Managed by professionals, good for beginners.',
        examples: ['Equity funds: 10-15% returns', 'Debt funds: 6-8% returns', 'SIP minimum: ₹500/month'],
        quiz: { question: 'Mutual funds are managed by?', options: ['You', 'Professional managers'], answer: 1 }
      },
      {
        id: 'gold-investment',
        title: 'Gold Investment',
        content: 'Hedge against inflation, digital gold is convenient option.',
        details: 'Gold protects against inflation and currency devaluation. Digital gold allows small investments without storage issues.',
        examples: ['Physical gold: jewelry, coins', 'Digital gold: apps like Paytm', 'Gold ETFs in stock market'],
        quiz: { question: 'Gold is good hedge against?', options: ['Deflation', 'Inflation'], answer: 1 }
      }
    ]
  },
  riskManagement: {
    title: 'Risk Management',
    icon: '⚠️',
    modules: [
      {
        id: 'scam-prevention',
        title: 'Scam Prevention',
        content: 'Avoid get-rich-quick schemes, verify before investing.',
        details: 'Common scams: Guaranteed high returns, Ponzi schemes, fake trading tips. Always verify with SEBI registered entities.',
        examples: ['Avoid 30%+ guaranteed returns', 'Check SEBI registration', 'No tips from unknown sources'],
        quiz: { question: 'Guaranteed 30% returns are?', options: ['Great opportunity', 'Likely a scam'], answer: 1 }
      },
      {
        id: 'stop-loss',
        title: 'Stop Loss Strategy',
        content: 'Set maximum loss limit to protect your capital.',
        details: 'Stop loss automatically sells your stock if price falls below set level. Helps limit losses in volatile markets.',
        examples: ['Buy at ₹100, set stop loss at ₹90', 'Limit loss to 10%', 'Protect capital for future opportunities'],
        quiz: { question: 'Stop loss helps to?', options: ['Maximize profits', 'Limit losses'], answer: 1 }
      }
    ]
  }
};

export const calculateProgress = (completedModules) => {
  const totalModules = Object.values(learningModules).reduce((sum, category) => sum + category.modules.length, 0);
  return Math.round((completedModules.length / totalModules) * 100);
};

export const getLearningLevel = (progress) => {
  if (progress < 20) return { level: 'Beginner', icon: '🌱', color: 'text-green-600' };
  if (progress < 50) return { level: 'Learning', icon: '📖', color: 'text-blue-600' };
  if (progress < 80) return { level: 'Intermediate', icon: '⭐', color: 'text-yellow-600' };
  return { level: 'Expert', icon: '🏆', color: 'text-purple-600' };
};