import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal } from '../types';

interface GoalState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string) => void;
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goalData) => {
        const goal: Goal = {
          id: crypto.randomUUID(),
          ...goalData,
          createdAt: new Date(),
        };
        set((state) => ({ goals: [...state.goals, goal] }));
      },
      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),
      completeGoal: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, completed: true } : goal
          ),
        })),
    }),
    {
      name: 'goals-storage',
    }
  )
);