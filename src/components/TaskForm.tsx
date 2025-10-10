import { useState } from "react"
import { useTask } from "../app/context/TaskContext";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

function TaskForm() {

    const [taskName, setTaskName] = useState('')
    const { createTask, addingTask } = useTask()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask(taskName, setTaskName)
        toast.success("Tarea añadida correctamente")
        setTaskName("")
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
            <div className="w-full h-1/2 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
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
                            placeholder="Escribe una tarea"
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                            className="p-2 border-2 rounded-lg border-gray-500 pr-20 py-3 focus:border-blue-600 focus:border-2 focus:outline-hidden"
                        />
                        <button disabled={addingTask}
                            className="bg-gradient-to-r from-blue-700 to-blue-600 cursor-pointer hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-600 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
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