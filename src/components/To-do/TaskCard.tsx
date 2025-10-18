import { useTask } from '@/app/context/TaskContext'
import React, { useState } from 'react'
import { Trash2, CheckCheck, X, SquarePen } from 'lucide-react'
import { formatDateString } from '../CalendarComp'
import UpdateTask from './UpdateTask'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from '../ui/buttonStyle'
import { toast } from 'sonner'

interface taskProps {
    name: string,
    description: string,
    status: string,
    priority: string,
    done: boolean,
    id: any,
    expirationDate: null
}

function TaskCard(task: taskProps) {

    const { deleteTask, updateDone } = useTask()

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const DeleteAlert = () => {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className='cursor-pointer hover:text-white transition-colors'>
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </DialogTrigger>
                <DialogContent className="dark w-90 h-45">
                    <DialogHeader>
                        <div className='flex items-center flex-row gap-3'>
                            <div className='bg-red-300 p-2 rounded-lg'>
                                <Trash2 size={20} className='text-red-900' />
                            </div>
                            <DialogTitle className='mb-2 text-xl'>Eliminar tarea</DialogTitle>
                        </div>
                        <DialogDescription className='flex flex-col'>
                            <span>¿Estás seguro de que quieres eliminar esta tarea?</span>
                            <span className='font-semibold text-red-300'>No podrás recuperarla.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-3 justify-end items-center">
                        <DialogClose>
                            <span className="bg-primary border-1 border-border text-white/80 px-4 py-2 hover:text-white hover:bg-[#1c1c1c] rounded-md text-sm font-medium transition-all cursor-pointer disabled:opacity-50 outline-none">Cancelar</span>
                        </DialogClose>
                        <Button variant={"delete"} onClick={handleDelete}>Eliminar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )

    }

    const handleToggleDone = () => {
        if (task.done) {
            toast.error('Tarea marcada como no completada')
        }
        else {
            toast.success('Tarea marcada como completada')
        }
        updateDone(task.id, { done: !task.done })
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
                        <h1 className="text-sm sm:text-lg font-medium break-words  flex-1 leading-tight sm:leading-normal">{task.name}</h1>
                        <button
                            className='flex-shrink-0 text-white/70 hover:text-white transition-colors'
                            onClick={() => handleToggleDone()}>
                            {task.done ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
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

                <div className="text-white/60 flex p-2.5 sm:p-4 border-t border-border">
                    <span className="font-medium flex">{formatDateString(task.expirationDate ? new Date(task.expirationDate) : null)}</span>
                    <div className='gap-2.5 flex sm:gap-3 justify-end flex-1'>
                        <DeleteAlert />
                        <UpdateTask idTask={task.id} task={task} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard