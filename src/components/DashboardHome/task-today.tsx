"use client";

import { useTask } from "@/app/context/TaskContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function TasksToday() {
  const { tasks, updateDone } = useTask();

  interface Task {
    id: string;
    name: string;
    done: boolean;
    priority: string;
    expirationDate: null;
  }

  const handleToggleDone = (task: Task) => {
    if (task.done) {
      toast.error("Tarea marcada como no completada");
    } else {
      toast.success("Tarea marcada como completada");
    }
    updateDone(task.id, { done: !task.done });
  };

  return (
    <div className="border-border border bg-primary rounded-lg py-7 px-6 overflow-y-auto max-h-55 no-scrollbar">
      <div className="pb-2 justify-between flex items-center">
        <h1 className="text-sm font-medium text-muted-foreground">
          Tareas de hoy
        </h1>
        <Link
          href="/dashboard/to-do"
          className="text-sm font-medium text-muted-foreground flex items-center hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Ver todas
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {tasks
          .filter((task: Task) => {
            const today = new Date();
            if (!task.expirationDate) return false;
            const expirationDate = new Date(task.expirationDate);
            return (
              expirationDate.getDate() === today.getDate() &&
              expirationDate.getMonth() === today.getMonth() &&
              expirationDate.getFullYear() === today.getFullYear()
            );
          })
          .map((task: Task) => (
            <div
              key={task.id}
              className={`w-full cursor-pointer flex items-center gap-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors py-2 px-3 rounded-lg ${task.done ? "line-through text-white/50" : ""}`}
              onClick={() => handleToggleDone(task)}
            >
              <div className="flex items-center w-full justify-between">
                {task.name}
                <div
                  className={`w-10 h-3 rounded-full ${task.priority === "3" ? "bg-red-500" : task.priority === "2" ? "bg-yellow-500" : "bg-green-500"}`}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
