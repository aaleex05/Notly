import { useState } from "react"
import { useTask } from "../app/context/TaskContext";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

function TaskForm() {

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        status: "1",
        priority: "1"

    })
    const { createTask, addingTask } = useTask()

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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="flex justify-center text-4xl py-5 font-bold tracking-wide gradient-color">CREAR TAREA</h1>
                    {/* <div>
                        <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl">Iniciar sesión</h2>
                        <p className="text-gray-400">Introduce tu correo electrónico y te enviaremos un enlace mágico</p>
                    </div> */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            required
                            name="taskName"
                            placeholder="Escribe el nombre"
                            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                            value={taskData.name}
                            className="p-2 border-2 rounded-lg border-gray-500 py-3  focus:border-blue-600 focus:border-2 focus:outline-hidden"
                        />
                        <textarea
                            name="description"
                            placeholder="Escribe una descripción"
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            value={taskData.description}
                            className="p-2 border-2 rounded-lg border-gray-500 py-3 focus:border-blue-600 focus:border-2 focus:outline-hidden row-start-13 col-start-12"
                        />
                        <select
                            name="status"
                            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                            className="p-2 border-2 rounded-lg border-gray-500 py-2 bg-gray-800 focus:border-blue-600 focus:border-2 focus:outline-hidden">
                            <option value="1">Por hacer</option>
                            <option value="2">En progreso</option>
                            <option value="3">Hecho</option>
                        </select>

                        <select
                            name="priority"
                            onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                            className="p-2 border-2 rounded-lg border-gray-500 py-2 bg-gray-800 focus:border-blue-600 focus:border-2 focus:outline-hidden">
                            <option value="1">Baja</option>
                            <option value="2">Media</option>
                            <option value="3">Alta</option>
                        </select>

                        <button disabled={addingTask}
                            className="bg-gradient-to-r from-blue-700 to-blue-600 cursor-pointer hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-600 py-3 mt-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {addingTask ? (
                                <>
                                    <Spinner />
                                    <span>Añadiendo...</span>
                                </>
                            ) : 'Añadir'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm