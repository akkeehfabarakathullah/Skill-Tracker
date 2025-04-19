import React from 'react';
import { Brain, Target, Clock, Trophy } from 'lucide-react';
import { useSkillStore } from '../store/skillStore';
import { useGoalStore } from '../store/goalStore';
import { useLogStore } from '../store/logStore';
import { SkillList } from './SkillList';
import { GoalList } from './GoalList';
import { LogList } from './LogList';


export function Dashboard() {
  const skills = useSkillStore((state) => state.skills);
  const goals = useGoalStore((state) => state.goals);
  const logs = useLogStore((state) => state.logs);

  const totalHours = logs.reduce((acc, log) => acc + log.duration / 60, 0);
  const completedGoals = goals.filter((goal) => goal.completed).length;

  const stats = [
    { name: 'Total Skills', value: skills.length.toString(), icon: Brain },
    { name: 'Active Goals', value: goals.length.toString(), icon: Target },
    { name: 'Learning Hours', value: Math.round(totalHours).toString(), icon: Clock },
    { name: 'Achievements', value: completedGoals.toString(), icon: Trophy },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillList />
        <GoalList />
      </div>

      <LogList />
    </div>
  );
}