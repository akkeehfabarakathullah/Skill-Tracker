import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { useGoalStore } from '../store/goalStore';
import { AchievementPopup } from './AchievementPopup';

export function GoalList() {
  const { goals, addGoal, completeGoal, deleteGoal } = useGoalStore();
  const [isAdding, setIsAdding] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: new Date().toISOString().split('T')[0],
    completed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal(newGoal);
    setNewGoal({
      title: '',
      description: '',
      deadline: new Date().toISOString().split('T')[0],
      completed: false,
    });
    setIsAdding(false);
  };

  const handleComplete = (id: string) => {
    completeGoal(id);
    setShowAchievement(true);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Goals</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Goal title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <textarea
            placeholder="Description"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`p-4 border rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow ${
              goal.completed ? 'bg-green-50 dark:bg-green-900/20' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {goal.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                {!goal.completed && (
                  <button
                    onClick={() => handleComplete(goal.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAchievement && (
        <AchievementPopup
          title="Goal Completed! 🎉"
          message="Congratulations on achieving your goal!"
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  );
}