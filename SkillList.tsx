import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useSkillStore } from '../store/skillStore';
import type { Skill } from '../types';

export function SkillList() {
  const { skills, addSkill, updateSkill, deleteSkill } = useSkillStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency: 0 });
  const [editSkillId, setEditSkillId] = useState<string | null>(null);
  const [editedSkill, setEditedSkill] = useState<Skill | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.category) return;
    addSkill(newSkill);
    setNewSkill({ name: '', category: '', proficiency: 0 });
    setIsAdding(false);
  };

  const handleEdit = (skill: Skill) => {
    setEditSkillId(skill.id);
    setEditedSkill({ ...skill });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedSkill) {
      updateSkill(editedSkill.id, editedSkill);
      setEditSkillId(null);
      setEditedSkill(null);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="range"
            min="0"
            max="100"
            value={newSkill.proficiency}
            onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
            className="w-full"
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
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 border rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            {editSkillId === skill.id && editedSkill ? (
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <input
                  type="text"
                  value={editedSkill.name}
                  onChange={(e) => setEditedSkill({ ...editedSkill, name: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={editedSkill.category}
                  onChange={(e) => setEditedSkill({ ...editedSkill, category: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editedSkill.proficiency}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, proficiency: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditSkillId(null);
                      setEditedSkill(null);
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button type="submit" className="text-green-600 hover:text-green-800">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.category}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {editSkillId !== skill.id && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}