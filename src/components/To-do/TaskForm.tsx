import { useState } from "react"
import { useTask } from "../../app/context/TaskContext";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import Button from "../ui/buttonStyle";
import { CalendarComponent, formatDateString } from "../CalendarComp";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns"

function TaskForm() {

    type TaskFormData = {
        name: string;
        description: string;
        status: string;
        priority: string;
        date: string | null;
    }

    const { createTask, addingTask, setDate } = useTask()
    const [taskData, setTaskData] = useState<TaskFormData>({
        name: "",
        description: "",
        status: "1",
        priority: "1",
        date: null

    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask(taskData, setTaskData)
        console.log(taskData)
        toast.success("Tarea añadida correctamente")
        setTaskData({
            name: "",
            description: "",
            status: "1",
            priority: "1",
            date: null
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
                maxLength={270}
                className="p-2 rounded-lg border-1 h-35 border-border py-2 resize-none bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252] row-start-13 col-start-12"
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

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="default"
                        className="w-full flex justify-start text-left font-normal p-2 rounded-lg border border-border bg-primary"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {taskData.date ? format(new Date(taskData.date), "dd/MM/yyyy") : "Seleccionar fecha"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-primary">
                    <Calendar
                        fixedWeeks
                        mode="single"
                        selected={taskData.date ? new Date(taskData.date) : undefined}
                        onSelect={(date) => setTaskData({ ...taskData, date: date ? date.toISOString() : null})}
                        className="bg-primary border-1 border-border rounded-lg"
                    />
                </PopoverContent>
            </Popover>

            <div className="text-muted-foreground px-1 text-sm">
                {taskData.date ? (
                    <div>
                        Fecha de vencimiento seleccionada: {""}
                        <span className="font-medium">{formatDateString(taskData.date ? new Date(taskData.date) : null)}</span>.
                    </div>
                ) : (
                    "Selecciona una fecha de vencimiento"
                )}
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