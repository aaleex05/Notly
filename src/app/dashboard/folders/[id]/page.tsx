"use client"
import React, { use, useEffect, useState } from "react"
import { FolderContextProvider, useFolder } from "@/app/context/FolderContext"
import { Spinner } from "@/components/ui/spinner"
import { useTask } from "@/app/context/TaskContext"
import TaskCard from "@/components/To-do/TaskCard"
import CreateTask from "@/components/To-do/CreateTask"
import { Folder } from "lucide-react"
import Button from "@/components/ui/buttonStyle"

export default function FolderPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params)
    return (
        <FolderPageContentClient id={id} />
    )
}

function FolderPageContentClient({ id }: { id: number }) {

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

    useEffect(() => {
        FolderContent(id)
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center h-full justify-center"><Spinner /></div>
        )
    }

    const tasksToShow = folderContent[0]?.folder_tasks?.map(
        (relation: any) => relation.tasks
    ) || []

    if (tasksToShow.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 justify-center h-screen text-white/80">
                <div className="bg-primary border p-6 rounded-full">
                    <Folder size={60} />
                </div>
                <h1 className="text-2xl mb-2 font-semibold">No hay ninguna tarea en esta carpeta.</h1>
                <CreateTask>
                    <Button variant="white" size='default' className='flex gap-3 items-center text-md'>
                        Crear tarea
                    </Button>
                </CreateTask>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl p-5 font-bold">Carpeta: {folderContent[0].name}</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 p-2.5 sm:p-5 auto-rows-fr'>
                {tasksToShow.map((task: taskProps) => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>

        </div>
    )
}