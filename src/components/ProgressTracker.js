import React from 'react';
import { motion } from 'framer-motion';
import { calculateProgress, getLearningLevel } from '../utils/learningContent';

const ProgressTracker = ({ completedModules }) => {
  const progress = calculateProgress(completedModules);
  const level = getLearningLevel(progress);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">Learning Progress</h3>
          <p className="opacity-90">Keep learning to become a smart investor!</p>
        </div>
        <div className="text-right">
          <div className={`text-2xl ${level.icon}`}>{level.icon}</div>
          <div className="font-semibold">{level.level}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white h-3 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">{completedModules.length}</div>
          <div className="text-sm opacity-90">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{Math.floor(progress / 10)}</div>
          <div className="text-sm opacity-90">Badges</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{progress < 100 ? Math.ceil((100 - progress) / 10) : 0}</div>
          <div className="text-sm opacity-90">To Next Level</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;