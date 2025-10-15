import React, { createContext, useContext, useState } from "react"
import { supabase } from "../backend/client"
import { toast } from "sonner"

export const TaskContext = createContext()

export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('useTask tiene que utilizarse con TaskContextProvider')
    return context
}

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    const [addingTask, setAddingTask] = useState(false)
    const [showTaskDone, setShowTaskDone] = useState(false)
    const [expanded, setExpanded] = useState(true);
    const [date, setDate] = useState(Date | undefined > (new Date()))
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("In 2 days")


    const createTask = async (taskData) => {
        setAddingTask(true);
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast.error("No se pudo obtener el usuario autenticado");
            return;
        }

        try {
            const { error, data } = await supabase.from("tasks").insert({
                name: taskData.name,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                userID: user.id,
                done: false,
            })
                .select();

            setTasks([...tasks, ...data])
        } catch (error) {
            console.log(error)
            toast.error("Error al añadir la tarea")
            return;
        } finally {
            setAddingTask(false);
        }


    }

    const deleteTask = async (idTask) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("tasks")
            .delete()
            .eq("userID", user.id)
            .eq("id", idTask)
            .select();

        console.log(data)

        setTasks(
            tasks.filter((task) => task.id != idTask)
        )

        if (error) toast.error("Error al eliminar la tarea")
    }

    const updateTask = async (idTask, updateDone) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("tasks")
            .update(updateDone)
            .eq("userID", user.id)
            .eq("id", idTask)
            .select()

        if (error) toast.error("Error al actualizar la tarea")

        setTasks(tasks.filter((task) => task.id != idTask))
    }

    const getTasks = async (done = false) => {

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase.from("tasks")
            .select()
            .eq("userID", user.id) // Para que solo salga la tarea del usuario actual
            .eq("done", done)

        if (error) throw error;

        setTasks(data)
    }



    return <TaskContext.Provider 
    value={{ tasks, getTasks, createTask, addingTask, deleteTask, updateTask, showTaskDone, expanded, setExpanded }}>
        {children}
    </TaskContext.Provider>
}