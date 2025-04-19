import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Skill } from '../types';

interface SkillState {
  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

export const useSkillStore = create<SkillState>()(
  persist(
    (set) => ({
      skills: [],
      addSkill: (skillData) => {
        const skill: Skill = {
          id: crypto.randomUUID(),
          ...skillData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ skills: [...state.skills, skill] }));
      },
      updateSkill: (id, updates) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === id
              ? { ...skill, ...updates, updatedAt: new Date() }
              : skill
          ),
        })),
      deleteSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        })),
    }),
    {
      name: 'skills-storage',
    }
  )
);