import { useTask } from '@/app/context/TaskContext'
import React from 'react'

interface taskProps {
    name: string,
    description: string,
    status: string,
    priority: string,
    done: boolean,
    id: any
}

function TaskCard(task: taskProps) {

    const { deleteTask, updateTask } = useTask()

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const handleToggleDone = () => {
        updateTask(task.id, { done: !task.done })
    }
    return (
        <div className="px-2 py-8 mx-auto lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1>{task.name}</h1>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                    <p>{task.priority}</p>
                </div>
            </div>
            <button className='bg-red-600 py-2 px-4 rounded-2xl cursor-pointer' onClick={() => handleDelete()}>Delete</button>
            <button className='bg-green-600 py-2 px-4 rounded-2xl cursor-pointer' onClick={() => handleToggleDone()}>Done</button>
        </div>
    )
}

export default TaskCard