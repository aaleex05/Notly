"use client"

import { useTask } from "@/app/context/TaskContext";
import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { IconListCheck } from "@tabler/icons-react";
import CreateTask from "./CreateTask";
import Button from "../ui/buttonStyle";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  name: string;
  description: string;
  status: string;
  priority: string;
  done: boolean;
  id: number;
  expirationDate: null;
}

function SortableTask({ task }: { task: TaskProps }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined, // ✅ fix tipo
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        rounded-lg cursor-grab active:cursor-grabbing
        ${isDragging ? "ring-2 ring-white shadow-lg shadow-white/20 overflow-hidden" : ""}
      `}
    >
      <TaskCard {...task} />
    </div>
  );
}

function TaskList() {
  const { tasks, getTasks, setTasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(
      (n: { id: UniqueIdentifier }) => n.id === active.id,
    );
    const newIndex = tasks.findIndex(
      (n: { id: UniqueIdentifier }) => n.id === over.id,
    );
    setTasks(arrayMove(tasks, oldIndex, newIndex));
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center h-screen text-white/80">
        <div className="bg-primary border p-6 rounded-full">
          <IconListCheck size={60} />
        </div>
        <h1 className="text-2xl mb-2 font-semibold">
          Empieza creando tu primera tarea.
        </h1>
        <CreateTask>
          <Button
            variant="white"
            size="default"
            className="flex gap-3 items-center text-md"
          >
            Crear tarea
          </Button>
        </CreateTask>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((n: { id: UniqueIdentifier }) => n.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 p-2.5 sm:p-5 auto-rows-fr">
          {tasks.map((task: TaskProps) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;