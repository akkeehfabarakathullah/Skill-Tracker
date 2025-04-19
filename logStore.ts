import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LogEntry } from '../types';

interface LogState {
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id'>) => void;
  updateLog: (id: string, updates: Partial<LogEntry>) => void;
  deleteLog: (id: string) => void;
}

export const useLogStore = create<LogState>()(
  persist(
    (set) => ({
      logs: [],
      addLog: (logData) => {
        const log: LogEntry = {
          id: crypto.randomUUID(),
          ...logData,
        };
        set((state) => ({ logs: [...state.logs, log] }));
      },
      updateLog: (id, updates) =>
        set((state) => ({
          logs: state.logs.map((log) =>
            log.id === id ? { ...log, ...updates } : log
          ),
        })),
      deleteLog: (id) =>
        set((state) => ({
          logs: state.logs.filter((log) => log.id !== id),
        })),
    }),
    {
      name: 'logs-storage',
    }
  )
);