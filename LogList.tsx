import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLogStore } from '../store/logStore';

export function LogList() {
  const { logs, addLog, deleteLog } = useLogStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    content: '',
    duration: 30,
    resources: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog({
      ...newLog,
      date: new Date(newLog.date),
      resources: newLog.resources.filter(Boolean),
    });
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      content: '',
      duration: 30,
      resources: [''],
    });
    setIsAdding(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Logs</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Log
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="date"
            value={newLog.date}
            onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <textarea
            placeholder="What did you learn today?"
            value={newLog.content}
            onChange={(e) => setNewLog({ ...newLog, content: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={newLog.duration}
              onChange={(e) => setNewLog({ ...newLog, duration: parseInt(e.target.value) })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resources
            </label>
            {newLog.resources.map((resource, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="Resource URL"
                  value={resource}
                  onChange={(e) => {
                    const newResources = [...newLog.resources];
                    newResources[index] = e.target.value;
                    if (index === newResources.length - 1 && e.target.value) {
                      newResources.push('');
                    }
                    setNewLog({ ...newLog, resources: newResources });
                  }}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                {index < newLog.resources.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newResources = newLog.resources.filter((_, i) => i !== index);
                      setNewLog({ ...newLog, resources: newResources });
                    }}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
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
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 border rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(log.date).toLocaleDateString()}
                </p>
                <p className="mt-1 text-gray-900 dark:text-white">{log.content}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Duration: {log.duration} minutes
                </p>
                {log.resources.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Resources:
                    </p>
                    <ul className="list-disc list-inside text-sm text-indigo-600 dark:text-indigo-400">
                      {log.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {new URL(resource).hostname}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteLog(log.id)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}