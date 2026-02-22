"use client";

import { useFolder } from "@/app/context/FolderContext";
import { useNote } from "@/app/context/NoteContext";
import { useTask } from "@/app/context/TaskContext";
import { ListChecks, StickyNote, FolderClosed, TrendingUp } from "lucide-react";

interface Task {
  done: boolean;
}

export function StatsRow() {
  const { folders } = useFolder();
  const { notes } = useNote();
  const { tasks } = useTask();
  const stats = [
    {
      icon: ListChecks,
      label: "Tareas pendientes",
      value: tasks.filter((task: Task) => !task.done).length,
      color: "text-orange-500",
    },
    {
      icon: StickyNote,
      label: "Notas totales",
      value: notes.length,
      color: "text-green-500",
    },
    {
      icon: FolderClosed,
      label: "Carpetas",
      value: folders.length,
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Completadas",
      value: tasks.filter((task: Task) => task.done).length,
      color: "text-purple-500",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border border bg-primary rounded-lg p-4"
        >
          <div className="flex items-center gap-3 py-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white/70">
              <stat.icon className={`size-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
