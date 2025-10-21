import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizComponent = ({ quiz, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      onComplete(selectedAnswer === quiz.answer);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 rounded-lg p-4 mt-4"
    >
      <h4 className="font-semibold text-blue-800 mb-3">Quick Quiz</h4>
      <p className="text-gray-700 mb-4">{quiz.question}</p>
      
      <div className="space-y-2 mb-4">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            disabled={showResult}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              showResult
                ? index === quiz.answer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : index === selectedAnswer && selectedAnswer !== quiz.answer
                  ? 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-gray-100 border-gray-300'
                : selectedAnswer === index
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-gray-300 hover:border-blue-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {!showResult && selectedAnswer !== null && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answer
        </button>
      )}

      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center p-3 rounded-lg ${
            selectedAnswer === quiz.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {selectedAnswer === quiz.answer ? '✅ Correct!' : '❌ Try again next time!'}
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizComponent;