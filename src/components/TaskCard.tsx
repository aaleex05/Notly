import { useTask } from '@/app/context/TaskContext'
import React from 'react'

interface taskProps {
    name: string,
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
        <div className='flex gap-10 p-3 my-5 justify-center items-center rounded-2xl bg-blue-600'>
            <h1>{task.name}</h1>
            <p>{JSON.stringify(task.done)}</p>
            <div className='flex gap-5 px-5'>
                <button className='bg-red-600 py-2 px-4 rounded-2xl cursor-pointer' onClick={() => handleDelete()}>Delete</button>
                <button className='bg-green-600 py-2 px-4 rounded-2xl cursor-pointer' onClick={() => handleToggleDone()}>Done</button>
            </div>
        </div>
    )
}

export default TaskCard