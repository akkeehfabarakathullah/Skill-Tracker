export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  skillId?: string;
  createdAt: Date;
}

export interface LogEntry {
  id: string;
  date: Date;
  content: string;
  duration: number;
  skillId?: string;
  resources: string[];
}