import { useState } from "react"
import { useTask } from "../app/context/TaskContext";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import Button from "./ui/buttonStyle";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"




function TaskForm() {

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        status: "1",
        priority: "1"

    })
    const { createTask, addingTask, date, setDate } = useTask()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask(taskData, setTaskData)
        // console.log(taskData)
        toast.success("Tarea añadida correctamente")
        setTaskData({
            name: "",
            description: "",
            status: "1",
            priority: "1"
        })
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="text"
                required
                name="taskName"
                placeholder="Escribe el nombre"
                onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                value={taskData.name}
                maxLength={25}
                className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]"
            />
            <textarea
                name="description"
                placeholder="Escribe una descripción"
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                value={taskData.description}
                className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252] row-start-13 col-start-12"
            />
            <select
                required
                defaultValue='default'
                name="status"
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]">
                <option value="default" disabled>Estado de la tarea</option>
                <option value="1">Por hacer</option>
                <option value="2">En progreso</option>
                <option value="3">Hecho</option>
            </select>
            <select
                defaultValue='default'
                name="priority"
                onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]">
                <option value="default" disabled className="placeholder:text-amber-300">Prioridad de la tarea</option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
            </select>

            <div className="flex items-center justify-center w-full">
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
            />
            </div>

            <Button variant="white" disabled={addingTask}>
                {addingTask ? (
                    <div className="flex items-center justify-center gap-1">
                        <Spinner />
                        <span>Añadiendo...</span>
                    </div>
                ) : 'Añadir'}
            </Button>
        </form>
    )
}

export default TaskForm