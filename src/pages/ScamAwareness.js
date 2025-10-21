import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pie, Bar } from 'react-chartjs-2';
import { FaExclamationTriangle, FaShieldAlt, FaEye } from 'react-icons/fa';

const ScamAwareness = () => {
  const [selectedScam, setSelectedScam] = useState('ponzi');

  const scamTypes = {
    ponzi: {
      title: 'Ponzi Schemes',
      icon: '🔺',
      description: 'Fraudulent investment operations that pay returns using new investors money',
      warning: 'Promise of high returns with little risk',
      examples: ['Multi-level marketing schemes', 'Pyramid investment plans', 'Chain referral programs'],
      redFlags: ['Guaranteed high returns', 'Pressure to recruit others', 'Complex fee structures']
    },
    trading: {
      title: 'Fake Trading Apps',
      icon: '📱',
      description: 'Fraudulent apps that steal money by mimicking legitimate trading platforms',
      warning: 'Unregistered apps promising quick profits',
      examples: ['Fake stock trading apps', 'Cryptocurrency scam apps', 'Forex trading frauds'],
      redFlags: ['Not registered with SEBI', 'No proper documentation', 'Withdrawal issues']
    },
    crypto: {
      title: 'Cryptocurrency Scams',
      icon: '₿',
      description: 'Fraudulent schemes involving fake cryptocurrencies or investment platforms',
      warning: 'Unregulated crypto investments and fake coins',
      examples: ['Fake ICOs', 'Pump and dump schemes', 'Fake crypto exchanges'],
      redFlags: ['Promises of guaranteed returns', 'Celebrity endorsements', 'Pressure to invest quickly']
    },
    loan: {
      title: 'Loan Frauds',
      icon: '💳',
      description: 'Scams that ask for upfront fees for loans that never materialize',
      warning: 'Advance fee frauds and identity theft',
      examples: ['Advance fee loan scams', 'Fake loan approval calls', 'Identity theft for loans'],
      redFlags: ['Upfront fees required', 'No proper verification', 'Guaranteed approval claims']
    },
    mutual: {
      title: 'Fake Mutual Funds',
      icon: '📊',
      description: 'Fraudulent investment schemes posing as legitimate mutual fund investments',
      warning: 'Unregistered fund houses and fake AMCs',
      examples: ['Fake AMC schemes', 'Unregistered fund houses', 'Fake SIP plans'],
      redFlags: ['Not registered with AMFI', 'Unrealistic returns', 'No proper documentation']
    },
    ipo: {
      title: 'Fake IPOs',
      icon: '🏢',
      description: 'Fraudulent public offerings that collect money for non-existent companies',
      warning: 'Unregistered companies and fake public offerings',
      examples: ['Fake company IPOs', 'Unlisted company frauds', 'Pre-IPO investment scams'],
      redFlags: ['Not listed on exchanges', 'No SEBI approval', 'Pressure tactics']
    }
  };

  // Scam statistics data
  const scamStatsData = {
    labels: Object.values(scamTypes).map(scam => scam.title),
    datasets: [{
      label: 'Reported Cases (in thousands)',
      data: [45, 38, 52, 67, 23, 19],
      backgroundColor: [
        '#dc3545', '#fd7e14', '#ffc107', 
        '#20c997', '#6f42c1', '#e83e8c'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const lossAmountData = {
    labels: ['₹1L-5L', '₹5L-10L', '₹10L-25L', '₹25L-50L', '₹50L+'],
    datasets: [{
      label: 'Number of Victims',
      data: [1200, 800, 450, 200, 80],
      backgroundColor: '#dc3545',
      borderColor: '#dc3545',
      borderWidth: 1
    }]
  };

  const protectionTips = [
    {
      icon: '🔍',
      title: 'Verify Registration',
      description: 'Always check if the company is registered with SEBI, RBI, or relevant authorities'
    },
    {
      icon: '📋',
      title: 'Read Documents',
      description: 'Carefully read all terms, conditions, and fine print before investing'
    },
    {
      icon: '🤔',
      title: 'Question High Returns',
      description: 'Be skeptical of investments promising unusually high or guaranteed returns'
    },
    {
      icon: '👥',
      title: 'Consult Experts',
      description: 'Seek advice from certified financial advisors before making large investments'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ⚠️ Scam Awareness Center
          </h1>
          <p className="text-xl text-gray-600">
            Learn to identify and protect yourself from financial frauds
          </p>
        </motion.div>

        {/* Alert Banner */}
        <motion.div
          className="bg-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Stay Alert!</h3>
              <p className="text-red-700">
                Financial frauds are increasing. Always verify before investing your hard-earned money.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scam Type Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(scamTypes).map(([key, scam]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedScam(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedScam === key
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-gray-200 hover:border-red-300 bg-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{scam.icon}</div>
              <div className="text-sm font-semibold">{scam.title}</div>
            </motion.button>
          ))}
        </div>

        {/* Selected Scam Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            key={selectedScam}
            className="card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">{scamTypes[selectedScam].icon}</div>
              <h3 className="text-2xl font-bold text-gray-800">
                {scamTypes[selectedScam].title}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">What is it?</h4>
                <p className="text-gray-600">{scamTypes[selectedScam].description}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  Warning Signs
                </h4>
                <p className="text-red-700 text-sm">{scamTypes[selectedScam].warning}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Common Examples:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {scamTypes[selectedScam].examples.map((example, index) => (
                    <li key={index} className="text-gray-600 text-sm">{example}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaEye className="mr-2 text-red-500" />
                  Red Flags:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {scamTypes[selectedScam].redFlags.map((flag, index) => (
                    <li key={index} className="text-red-600 text-sm">{flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Scam Types by Reported Cases
              </h3>
              <div className="h-64">
                <Pie 
                  data={scamStatsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.label}: ${context.parsed}k cases`
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Financial Loss Distribution
              </h3>
              <div className="h-64">
                <Bar 
                  data={lossAmountData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.parsed.y} victims`
                        }
                      }
                    },
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Protection Tips */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <FaShieldAlt className="text-3xl text-green-500 mr-4" />
            <h3 className="text-2xl font-bold text-gray-800">How to Protect Yourself</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protectionTips.map((tip, index) => (
              <motion.div
                key={index}
                className="bg-green-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">{tip.title}</h4>
                    <p className="text-green-700 text-sm">{tip.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          className="card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📞 Report Fraud - Emergency Contacts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h4 className="font-semibold text-blue-800 mb-2">Cyber Crime Helpline</h4>
              <p className="text-2xl font-bold text-blue-600">1930</p>
              <p className="text-sm text-blue-700">24/7 Available</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <h4 className="font-semibold text-red-800 mb-2">Banking Fraud</h4>
              <p className="text-2xl font-bold text-red-600">1800-425-3800</p>
              <p className="text-sm text-red-700">RBI Helpline</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h4 className="font-semibold text-purple-800 mb-2">SEBI Complaints</h4>
              <p className="text-2xl font-bold text-purple-600">scores.gov.in</p>
              <p className="text-sm text-purple-700">Online Portal</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScamAwareness;