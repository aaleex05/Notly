import { useTask } from '@/app/context/TaskContext'
import React, { useEffect } from 'react'
import TaskCard from './TaskCard'

function TaskList({done = false}) {
  const { tasks, getTasks } = useTask()

  useEffect(() => {
    getTasks(done)
  }, [done])

  interface taskProps {
    name: string,
    done: boolean
    id: number
  }

  if (tasks.length == 0) {
    return <p>No hay tareas</p>
  } else {
    return (
      <div>
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