import { useTask } from '@/app/context/TaskContext'
import React from 'react'
import { Trash2, CheckCheck, X, SquarePen } from 'lucide-react'

interface taskProps {
    name: string,
    description: string,
    status: string,
    priority: string,
    done: boolean,
    id: any
}

function TaskCard(task: taskProps) {

    const { deleteTask, updateTask, showTaskDone } = useTask()

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const handleToggleDone = () => {
        updateTask(task.id, { done: !task.done })
    }

    const statusList: {
        [key: number]: {
            label: string;
            className: string
        }
    } = {
        1: { label: "Por hacer", className: "bg-red-200 text-red-700" },
        2: { label: "En progreso", className: "bg-amber-200 text-amber-700" },
        3: { label: "Hecho", className: "bg-green-200 text-green-700" }
    }

    const status = statusList[Number(task.status)] || statusList[1];

    const priorityList: {
        [key: number]: {
            label: string;
            className: string
        }
    } = {
        1: { label: "Baja", className: "bg-green-200 text-green-700" },
        2: { label: "Media", className: "bg-amber-200 text-amber-600" },
        3: { label: "Alta", className: "bg-red-200 text-red-700" }
    };

    const priority = priorityList[Number(task.priority)] || priorityList[1];

    return (
        <div className="w-full h-full">
            <div className="h-full flex flex-col rounded-lg shadow-sm border bg-primary border-border">
                <div className="p-3 sm:p-5 space-y-6 sm:space-y-3 flex-grow">
                    <div className='flex justify-between items-start gap-2 sm:gap-3'>
                        <h1 className="text-sm sm:text-lg font-medium break-words flex-1 leading-tight sm:leading-normal">{task.name}</h1>
                        <button
                            className='flex-shrink-0 text-white/70 hover:text-white transition-colors'
                            onClick={() => handleToggleDone()}>
                            {task.done ? <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : <X className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </button>
                    </div>
                    <p className="text-xs sm:text-base break-words line-clamp-2 text-white/70 leading-snug sm:leading-relaxed">{task.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className={`text-xs sm:text-sm py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full ${status.className}`}>
                            {status.label}
                        </span>
                        <span className={`text-xs sm:text-sm py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full ${priority.className}`}>
                            {priority.label}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end text-white/60 gap-2.5 sm:gap-3 p-2.5 sm:p-4 border-t border-border">
                    <button
                        className='cursor-pointer hover:text-white transition-colors'
                        onClick={() => handleDelete()}>
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                        className='cursor-pointer hover:text-white transition-colors'
                        onClick={() => console.log("Editando...")}>
                        <SquarePen className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard