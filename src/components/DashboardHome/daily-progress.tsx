"use client";

import { useTask } from "@/app/context/TaskContext";

interface TasksProps {
  id: string;
  done: boolean;
  expirationDate: null;
}

export function DailyProgress() {
  const { tasks } = useTask();
  const today = new Date();
  const todayTasks = tasks.filter((task: TasksProps) => {
    if (!task.expirationDate) return false;
    const taskDate = new Date(task.expirationDate);
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });
  const total = todayTasks.length;
  const completed = todayTasks.filter((task: TasksProps) => task.done).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="border-border border bg-primary rounded-lg p-4">
      <div className="pb-2">
        <h1 className="text-sm font-medium text-muted-foreground">
          Progreso del dia
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-white/10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              className="text-white transition-all duration-700"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white/80">
              {percentage}%
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {completed} de {total} tareas
        </p>
      </div>
    </div>
  );
}
