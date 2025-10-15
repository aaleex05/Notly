import { useTask } from '@/app/context/TaskContext'
import React, { useEffect } from 'react'
import TaskCard from './TaskCard'
import { IconFilePlus } from "@tabler/icons-react"
import CreateTask from './CreateTask'


function TaskList({ done = false }) {
  const { tasks, getTasks } = useTask()

  useEffect(() => {
    getTasks(done)
  }, [done])

  interface taskProps {
    name: string,
    description: string,
    status: string,
    priority: string,
    done: boolean,
    id: number
  }

  if (tasks.length == 0) {
    return (
      <div className='flex gap-3 flex-col items-center h-full justify-center'>
        <div className='bg-[#262626] w-fit p-2 rounded-md'>
          <IconFilePlus />
        </div>
        <h1 className='font-medium text-xl text-white/85'>No hay tareas todavía</h1>
        <div className='text-sm items-center text-center text-white/55'>
          <p>Aún no has creado ningúna tarea.</p>
          <p>Empieza creando tu primera tarea.</p>
        </div>
        <CreateTask variante="white" text='Crear Tarea' size='default'/>
      </div>
    )
  } else {
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