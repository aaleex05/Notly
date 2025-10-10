"use client"
import { TaskContextProvider } from '@/app/context/TaskContext'
import TaskForm from '@/components/TaskForm'
import React from 'react'

function NewTask() {
    return (
        <TaskContextProvider>
            <TaskForm />
        </TaskContextProvider>
    )
}

export default NewTask