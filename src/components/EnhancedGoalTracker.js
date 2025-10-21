import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaArrowUp, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const EnhancedGoalTracker = ({ goals, onUpdateGoals }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: 100000,
    savedAmount: 0,
    monthlyContribution: 5000,
    targetDate: '',
    category: 'savings'
  });

  const categories = {
    savings: { name: 'Emergency Fund', icon: '🛡️', color: 'bg-blue-500' },
    house: { name: 'Home Purchase', icon: '🏠', color: 'bg-green-500' },
    car: { name: 'Vehicle', icon: '🚗', color: 'bg-red-500' },
    education: { name: 'Education', icon: '🎓', color: 'bg-purple-500' },
    vacation: { name: 'Travel', icon: '✈️', color: 'bg-yellow-500' },
    investment: { name: 'Investment', icon: '📈', color: 'bg-indigo-500' },
    retirement: { name: 'Retirement', icon: '🏖️', color: 'bg-gray-500' }
  };

  const calculateProgress = (goal) => {
    return Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  };

  const calculateTimeToGoal = (goal) => {
    const remaining = goal.targetAmount - goal.savedAmount;
    if (remaining <= 0) return { months: 0, status: 'completed' };
    
    const months = Math.ceil(remaining / goal.monthlyContribution);
    const targetDate = new Date(goal.targetDate);
    const projectedDate = new Date();
    projectedDate.setMonth(projectedDate.getMonth() + months);
    
    if (projectedDate > targetDate) {
      return { months, status: 'behind' };
    } else if (projectedDate.getTime() === targetDate.getTime()) {
      return { months, status: 'ontrack' };
    } else {
      return { months, status: 'ahead' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'ahead': return 'text-green-600';
      case 'ontrack': return 'text-blue-600';
      case 'behind': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressBarColor = (progress, status) => {
    if (progress === 100) return 'bg-green-500';
    if (status === 'behind') return 'bg-red-500';
    if (status === 'ahead') return 'bg-green-500';
    return 'bg-blue-500';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: editingGoal?.id || Date.now(),
      ...formData,
      createdAt: editingGoal?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedGoals;
    if (editingGoal) {
      updatedGoals = goals.map(g => g.id === editingGoal.id ? newGoal : g);
    } else {
      updatedGoals = [...goals, newGoal];
    }

    onUpdateGoals(updatedGoals);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      targetAmount: 100000,
      savedAmount: 0,
      monthlyContribution: 5000,
      targetDate: '',
      category: 'savings'
    });
    setShowForm(false);
    setEditingGoal(null);
  };

  const editGoal = (goal) => {
    setFormData(goal);
    setEditingGoal(goal);
    setShowForm(true);
  };

  const deleteGoal = (goalId) => {
    onUpdateGoals(goals.filter(g => g.id !== goalId));
  };

  const addContribution = (goalId, amount) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          savedAmount: Math.min(goal.savedAmount + amount, goal.targetAmount),
          updatedAt: new Date().toISOString()
        };
      }
      return goal;
    });
    onUpdateGoals(updatedGoals);
  };

  const getMilestones = (goal) => {
    const progress = calculateProgress(goal);
    const milestones = [
      { threshold: 25, label: '25% Complete', achieved: progress >= 25, tip: 'Great start! Keep the momentum going.' },
      { threshold: 50, label: 'Halfway There!', achieved: progress >= 50, tip: 'You\'re doing amazing! Consider increasing contributions.' },
      { threshold: 75, label: '75% Complete', achieved: progress >= 75, tip: 'Almost there! Stay focused on your goal.' },
      { threshold: 100, label: 'Goal Achieved!', achieved: progress >= 100, tip: 'Congratulations! Time to set a new goal.' }
    ];
    return milestones;
  };

  const getGoalTips = (goal) => {
    const timeInfo = calculateTimeToGoal(goal);
    const progress = calculateProgress(goal);
    
    if (progress >= 100) return 'Goal completed! Consider setting a new challenge.';
    if (timeInfo.status === 'behind') return 'Consider increasing monthly contributions to stay on track.';
    if (timeInfo.status === 'ahead') return 'Excellent progress! You might reach your goal early.';
    if (progress < 25) return 'Start with small, consistent contributions to build momentum.';
    return 'You\'re on track! Keep up the regular contributions.';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Goals</h2>
          <p className="text-gray-600">Track your progress towards financial milestones</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Goal Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingGoal ? 'Edit Goal' : 'Create New Goal'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Emergency Fund"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(categories).map(([key, cat]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({...formData, category: key})}
                        className={`p-2 rounded-lg border text-sm flex items-center space-x-2 ${
                          formData.category === key
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Amount: ₹{formData.targetAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="10000"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({...formData, targetAmount: Number(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Contribution: ₹{formData.monthlyContribution.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={formData.monthlyContribution}
                    onChange={(e) => setFormData({...formData, monthlyContribution: Number(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    {editingGoal ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={resetForm} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Grid */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const progress = calculateProgress(goal);
            const timeInfo = calculateTimeToGoal(goal);
            const category = categories[goal.category];
            const milestones = getMilestones(goal);

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{goal.name}</h3>
                      <p className="text-sm text-gray-500">{category.name}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => editGoal(goal)} className="p-1 text-gray-400 hover:text-blue-600">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteGoal(goal.id)} className="p-1 text-gray-400 hover:text-red-600">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-gray-800">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${getProgressBarColor(progress, timeInfo.status)}`}
                    />
                  </div>
                </div>

                {/* Amount Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">₹{goal.savedAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">₹{goal.targetAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Target</div>
                  </div>
                </div>

                {/* Status & Timeline */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`flex items-center space-x-2 text-sm font-medium ${getStatusColor(timeInfo.status)}`}>
                    {timeInfo.status === 'completed' && <FaCheckCircle />}
                    {timeInfo.status === 'behind' && <FaExclamationTriangle />}
                    {timeInfo.status === 'ahead' && <FaArrowUp />}
                    {timeInfo.status === 'ontrack' && <FaCalendarAlt />}
                    <span>
                      {timeInfo.status === 'completed' ? 'Goal Achieved!' :
                       timeInfo.status === 'behind' ? `${timeInfo.months} months (Behind Schedule)` :
                       timeInfo.status === 'ahead' ? `${timeInfo.months} months (Ahead of Schedule)` :
                       `${timeInfo.months} months (On Track)`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Monthly: ₹{goal.monthlyContribution.toLocaleString()} • Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Milestones */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-700 mb-2">Progress Milestones</div>
                  <div className="flex space-x-1 mb-2">
                    {milestones.map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        className={`flex-1 h-2 rounded ${
                          milestone.achieved ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                        title={milestone.label}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: milestone.achieved ? 1 : 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    💡 {getGoalTips(goal)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => addContribution(goal.id, goal.monthlyContribution)}
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Add Monthly
                  </button>
                  <button
                    onClick={() => addContribution(goal.id, 1000)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    +₹1K
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Goals Set</h3>
          <p className="text-gray-500 mb-6">Start your financial journey by setting your first goal</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Your First Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedGoalTracker;