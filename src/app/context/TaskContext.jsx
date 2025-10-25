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
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(null)
    const [month, setMonth] = useState(new Date())
    const [valueNull, setValueNull] = useState(false)


    const createTask = async (taskData) => {
        setAddingTask(true);
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.log("No se pudo obtener el usuario autenticado");
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
                expirationDate: taskData.date

            })
                .select();
            if (taskData.folderID && taskData.folderID !== 0 && data && data[0]) {
                const { error: folderError } = await supabase
                    .from("folder_tasks")
                    .insert({
                        folder_id: taskData.folderID,
                        task_id: data[0].id
                    });

                if (folderError) {
                    console.error("Error al relacionar con carpeta:", folderError);
                }
            }

            setTasks([...tasks, ...data])
            console.log(data)
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

    const updateDone = async (idTask, updateDone) => {
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

    const updateTask = async (idTask, updateTask) => {
        const { data: { user } } = await supabase.auth.getUser();
        try {
            const { folderID, ...taskData } = updateTask;

            const { data, error } = await supabase
                .from("tasks")
                .update(taskData)
                .eq("userID", user.id)
                .eq("id", idTask)
                .select()
                .single();

            if (error) throw error;

            if (folderID !== undefined && folderID !== '') {
                await supabase
                    .from("folder_tasks")
                    .delete()
                    .eq("task_id", idTask);

                if (folderID && folderID !== '0') {
                    const { error: relationError } = await supabase
                        .from("folder_tasks")
                        .insert({
                            folder_id: parseInt(folderID),
                            task_id: idTask
                        });

                    if (relationError) {
                        console.error("Error al actualizar relación con carpeta:", relationError);
                        toast.error("Tarea actualizada pero error al cambiar carpeta");
                    }
                }
            }

            setTasks(prevTasks =>
                prevTasks.map((task) =>
                    task.id === idTask ? { ...task, ...data } : task
                )
            )

            toast.success("Tarea actualizada correctamente");
            return data;

        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar la tarea")
            throw error;
        }
    }

    const getTasks = async (done = false) => {
        const { data: { user } } = await supabase.auth.getUser();
        try {

            const { data, error } = await supabase.from("tasks")
                .select()
                .eq("userID", user.id) // Para que solo salga la tarea del usuario actual
                .eq("done", done)

            setTasks(data)
        } catch (error) {
            console.log(error)
        }

    }





    return <TaskContext.Provider
        value={{
            tasks,
            getTasks,
            createTask,
            addingTask,
            setValueNull,
            valueNull,
            deleteTask,
            updateDone,
            updateTask,
            showTaskDone,
            expanded,
            setExpanded,
            open,
            setOpen,
            date,
            setDate,
            month,
            setMonth,
        }}>
        {children}
    </TaskContext.Provider>
}