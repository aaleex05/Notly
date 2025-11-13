import { useTask } from '@/app/context/TaskContext'
import React, { useEffect } from 'react'
import TaskCard from './TaskCard'
import { IconListCheck } from "@tabler/icons-react"
import CreateTask from './CreateTask'
import Button from '../ui/buttonStyle'


function TaskList() {
  const { tasks, getTasks, loadinTask } = useTask()

  useEffect(() => {
    getTasks()
  })

  interface taskProps {
    name: string,
    description: string,
    status: string,
    priority: string,
    done: boolean,
    id: number,
    expirationDate: null
  }

  if (tasks.length == 0) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center h-screen text-white/80">
        <div className="bg-primary border p-6 rounded-full">
          <IconListCheck size={60} />
        </div>
        <h1 className="text-2xl mb-2 font-semibold">Empieza creando tu primera tarea.</h1>
        <CreateTask>
          <Button variant="white" size='default' className='flex gap-3 items-center text-md'>
            Crear tarea
          </Button>
        </CreateTask>
      </div>
    )
  }
  else {
    // console.log(tasks)
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 p-2.5 sm:p-5 auto-rows-fr'>
        {
          tasks.map((task: taskProps) => (
            <TaskCard key={task.id} {...task} />
          ))
        }

      </div>
    )
  }

}

export default TaskList