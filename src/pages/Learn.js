import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { learningModules } from '../utils/learningContent';
import QuizComponent from '../components/QuizComponent';
import ProgressTracker from '../components/ProgressTracker';
import InteractiveInvestmentChart from '../components/InteractiveInvestmentChart';
import { FaPlay, FaCheck, FaChartLine, FaBookOpen, FaQuestionCircle } from 'react-icons/fa';

const Learn = ({ user }) => {
  const [activeSection, setActiveSection] = useState('learning');
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`learning-progress-${user?.uid || 'guest'}`);
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, [user]);

  const saveProgress = (moduleId) => {
    const updated = [...completedModules, moduleId];
    setCompletedModules(updated);
    localStorage.setItem(`learning-progress-${user?.uid || 'guest'}`, JSON.stringify(updated));
  };

  const handleQuizComplete = (correct) => {
    if (correct && selectedModule && !completedModules.includes(selectedModule.id)) {
      saveProgress(selectedModule.id);
    }
    setShowQuiz(false);
    setSelectedModule(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Learn – Financial Literacy & Investment Basics
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Master the fundamentals of investing and financial planning with interactive tools and real market insights
          </p>
        </motion.div>

        <ProgressTracker completedModules={completedModules} />

        <div className="flex flex-wrap justify-center mb-8 gap-4">
          {[
            { id: 'learning', label: 'Learn', icon: FaBookOpen },
            { id: 'compare', label: 'Compare Investments', icon: FaChartLine },
            { id: 'quiz', label: 'Practice', icon: FaQuestionCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeSection === 'learning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(learningModules).map(([key, category]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{category.title}</h3>
                  <div className="space-y-3">
                    {category.modules.map((module) => {
                      const isCompleted = completedModules.includes(module.id);
                      return (
                        <div
                          key={module.id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                            isCompleted
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => {
                            setSelectedModule(module);
                            setShowQuiz(false);
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            {isCompleted ? (
                              <FaCheck className="text-green-600" />
                            ) : (
                              <FaPlay className="text-blue-600" />
                            )}
                            <div>
                              <div className="font-semibold text-gray-800">{module.title}</div>
                              <div className="text-sm text-gray-600">{module.content}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedModule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedModule(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{selectedModule.title}</h3>
                    <button
                      onClick={() => setSelectedModule(null)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg">{selectedModule.details}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {selectedModule.examples.map((example, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!showQuiz && (
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Take Quiz to Complete
                      </button>
                    )}

                    {showQuiz && (
                      <QuizComponent
                        quiz={selectedModule.quiz}
                        onComplete={handleQuizComplete}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Smart Investing Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Start Early</h4>
                      <p className="text-gray-600 text-sm">Time is your biggest advantage in investing. Start with small amounts.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Diversify</h4>
                      <p className="text-gray-600 text-sm">Don't put all money in one investment. Spread across different assets.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Stay Disciplined</h4>
                      <p className="text-gray-600 text-sm">Invest regularly through SIP, don't try to time the market.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Emergency Fund First</h4>
                      <p className="text-gray-600 text-sm">Keep 6-12 months expenses before investing in risky assets.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Avoid Scams</h4>
                      <p className="text-gray-600 text-sm">No guaranteed high returns. Verify with SEBI before investing.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Keep Learning</h4>
                      <p className="text-gray-600 text-sm">Financial markets evolve. Stay updated with knowledge.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'compare' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <InteractiveInvestmentChart />
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Investment Performance Analysis</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">5-Year Performance (₹1L Investment):</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🥇</span>
                        <span className="font-medium text-gray-800">Gold</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">₹1,54,000</div>
                        <div className="text-sm text-green-600">+54% (9% annual)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📈</span>
                        <span className="font-medium text-gray-800">Stocks</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">₹2,01,000</div>
                        <div className="text-sm text-green-600">+101% (15% annual)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📊</span>
                        <span className="font-medium text-gray-800">Mutual Funds</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">₹1,76,000</div>
                        <div className="text-sm text-green-600">+76% (12% annual)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🏦</span>
                        <span className="font-medium text-gray-800">Savings Account</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">₹1,22,000</div>
                        <div className="text-sm text-green-600">+22% (4% annual)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">💰</span>
                        <span className="font-medium text-gray-800">Fixed Deposit</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">₹1,40,000</div>
                        <div className="text-sm text-green-600">+40% (7% annual)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Recommended Portfolio:</h4>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 font-medium mb-3">Balanced Allocation Strategy:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">📈 Stocks (Growth)</span>
                        <span className="font-semibold text-blue-800">40%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">📊 Mutual Funds (Diversified)</span>
                        <span className="font-semibold text-blue-800">30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">🥇 Gold (Hedge)</span>
                        <span className="font-semibold text-blue-800">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">💰 Fixed Deposits (Stability)</span>
                        <span className="font-semibold text-blue-800">10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">🏦 Savings (Emergency)</span>
                        <span className="font-semibold text-blue-800">5%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Key Insights:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gold outperformed due to inflation hedge</li>
                      <li>• Stocks show high growth with volatility</li>
                      <li>• Diversification reduces overall risk</li>
                      <li>• Emergency fund in savings is essential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'quiz' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Practice Quiz</h3>
            <p className="text-gray-600 mb-8">Complete learning modules to unlock practice quizzes</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {Object.entries(learningModules).map(([key, category]) => {
                const completedInCategory = category.modules.filter(m => completedModules.includes(m.id)).length;
                const totalInCategory = category.modules.length;
                const isUnlocked = completedInCategory > 0;
                
                return (
                  <div
                    key={key}
                    className={`p-4 rounded-lg border ${
                      isUnlocked
                        ? 'bg-white border-blue-200 hover:border-blue-400 cursor-pointer'
                        : 'bg-gray-100 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-2xl mb-2">{isUnlocked ? category.icon : '🔒'}</div>
                    <h4 className="font-semibold text-gray-800">{category.title}</h4>
                    <p className="text-sm text-gray-600">
                      {completedInCategory}/{totalInCategory} completed
                    </p>
                    {!isUnlocked && (
                      <p className="text-xs text-gray-500 mt-2">Complete modules to unlock</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Learn;