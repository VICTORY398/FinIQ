import React from 'react';
import { motion } from 'framer-motion';
import { updateUserProfile } from '../utils/userService';
import EnhancedGoalTracker from '../components/EnhancedGoalTracker';

const Goals = ({ user, userProfile, setUserProfile }) => {
  const handleUpdateGoals = async (updatedGoals) => {
    const newProfile = { ...userProfile, goals: updatedGoals };
    setUserProfile(newProfile);
    
    if (user?.uid) {
      try {
        await updateUserProfile(user.uid, { goals: updatedGoals });
      } catch (error) {
        // Error saving goals - will retry on next update
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Financial Goals
          </h1>
          <p className="text-xl text-gray-600">
            Set realistic financial targets and track your progress
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EnhancedGoalTracker 
            goals={userProfile?.goals || []}
            onUpdateGoals={handleUpdateGoals}
          />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="mt-12 bg-white rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">💡 Smart Goal Setting Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-600 text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-blue-800 mb-2">Be Specific</h4>
              <p className="text-blue-700 text-sm">
                Set clear amounts and deadlines for better tracking
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-600 text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-green-800 mb-2">Start Small</h4>
              <p className="text-green-700 text-sm">
                Begin with achievable goals to build momentum
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-purple-600 text-2xl mb-2">🔄</div>
              <h4 className="font-semibold text-purple-800 mb-2">Automate</h4>
              <p className="text-purple-700 text-sm">
                Set up automatic transfers for consistent progress
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="text-yellow-600 text-2xl mb-2">📊</div>
              <h4 className="font-semibold text-yellow-800 mb-2">Review Monthly</h4>
              <p className="text-yellow-700 text-sm">
                Check progress regularly and adjust as needed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Goals;