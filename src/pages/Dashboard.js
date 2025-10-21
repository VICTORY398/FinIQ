import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaBullseye, FaShieldAlt, FaCoins, FaTrophy } from 'react-icons/fa';

const Dashboard = ({ setCurrentPage, userProfile }) => {


  const features = [
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: 'Learn Investing',
      description: 'Master the basics of stock market, mutual funds, and financial planning',
      action: () => setCurrentPage('learn'),
      color: 'from-green-400 to-green-600'
    },
    {
      icon: <FaCoins className="text-4xl text-yellow-500" />,
      title: 'Virtual Portfolio',
      description: 'Practice investing with ₹10,000 virtual money risk-free',
      action: () => setCurrentPage('portfolio'),
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: <FaBullseye className="text-4xl text-blue-500" />,
      title: 'Goal Tracker',
      description: 'Set and track your financial goals with smart planning tools',
      action: () => setCurrentPage('goals'),
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-500" />,
      title: 'Scam Awareness',
      description: 'Learn to identify and avoid financial scams and frauds',
      action: () => setCurrentPage('scam'),
      color: 'from-red-400 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                Welcome to <span className="text-primary">FinQuest</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your journey to financial literacy starts here 🚀
              </p>
            </motion.div>

            {/* Animated India Map with Coins */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-8xl mb-4">🇮🇳</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-4xl"
                >
                  💰
                </motion.div>
              </div>
              <div className="absolute top-0 left-1/4">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  📈
                </motion.div>
              </div>
              <div className="absolute top-0 right-1/4">
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-2xl"
                >
                  💎
                </motion.div>
              </div>
            </motion.div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl mb-3">📚</div>
                <div className="text-xl font-bold text-blue-600 mb-2">Learn & Grow</div>
                <div className="text-gray-600">Financially</div>
              </motion.div>
              <motion.div
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl mb-3">💼</div>
                <div className="text-xl font-bold text-green-600 mb-2">Simulate Real</div>
                <div className="text-gray-600">Investments Safely</div>
              </motion.div>
              <motion.div
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-4xl mb-3">🎯</div>
                <div className="text-xl font-bold text-purple-600 mb-2">Achieve Your</div>
                <div className="text-gray-600">Financial Goals</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Start Your Financial Journey
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onClick={feature.action}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 text-center">
                  <span className="text-primary font-semibold group-hover:underline">
                    Get Started →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Profile Summary */}
      {userProfile && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Your Progress</h3>
                <FaTrophy className="text-3xl text-yellow-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹{userProfile.virtualBalance?.toLocaleString()}</div>
                  <div className="text-gray-600">Virtual Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{userProfile.portfolio?.length || 0}</div>
                  <div className="text-gray-600">Investments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userProfile.goals?.length || 0}</div>
                  <div className="text-gray-600">Goals Set</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;