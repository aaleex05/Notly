"use client"
import React, { use, useEffect, useState } from "react"
import { FolderContextProvider, useFolder } from "@/app/context/FolderContext"
import { Spinner } from "@/components/ui/spinner"
import { useTask } from "@/app/context/TaskContext"
import TaskCard from "@/components/To-do/TaskCard"

export default function FolderPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params)
    return (
        <FolderPageContentClient id={id} />
    )
}

function FolderPageContentClient({ id }: { id: number }) {
    interface FolderContentProps {
        id: number;
        name: string;
        idTasks: number[];
    }

    interface taskProps {
        name: string,
        description: string,
        status: string,
        priority: string,
        done: boolean,
        id: number,
        expirationDate: null
    }

    const { FolderContent, folderContent, loading } = useFolder()
    const { tasks, getTasks } = useTask()

    useEffect(() => {
        FolderContent(id)
        getTasks()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center h-full justify-center"><Spinner /></div>
        )
    }

    if (folderContent.length === 0) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-5">La carpeta está vacía.</h1>
            </div>
        )
    }

    const currentFolder = folderContent[0];
    const taskIds = currentFolder?.idTasks || []; 

    const folderTasks = tasks.filter((task: taskProps) => 
        taskIds.includes(task.id)
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-5">
                {currentFolder?.name || `Carpeta ${id}`}
            </h1>
            
            {folderTasks.length === 0 ? (
                <p className="text-gray-500">No hay tareas en esta carpeta</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 p-2.5 sm:p-5 auto-rows-fr'>
                    {folderTasks.map((task: taskProps) => (
                        <TaskCard key={task.id} {...task} />
                    ))}
                </div>
            )}
        </div>
    )
}