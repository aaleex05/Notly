import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/buttonStyle"
import { SquarePen } from "lucide-react"
import { useTask } from "@/app/context/TaskContext"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { formatDateString } from "../CalendarComp"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { useFolder } from "@/app/context/FolderContext"
import { useParams } from "next/navigation"
import { supabase } from "@/app/backend/client"

interface EditForm {
    name: string;
    description: string;
    status: string;
    priority: string;
    date: string | null;
    folderID: number;
}

interface taskProps {
    name: string,
    description: string,
    status: string,
    priority: string,
    done: boolean,
    id: number,
    expirationDate: null
    foldereID?: number
}

function UpdateTask(props: { idTask?: number, task?: taskProps }) {

    const { updateTask } = useTask()
    const { idTask, task } = props
    const { folders, FolderContent } = useFolder()
    const params = useParams() 

    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState<EditForm>({
        name: '',
        description: '',
        status: '1',
        priority: '1',
        date: null,
        folderID: 0
    })

    interface FolderProps {
        id: number;
        name: string;
    }

    useEffect(() => {
        const loadTaskData = async () => {
            if (task && idTask) {
                // Obtener carpeta asociada
                const { data: folderData } = await supabase
                    .from("folder_tasks")
                    .select("folder_id")
                    .eq("task_id", idTask)
                    .maybeSingle();

                // Establecer todo el estado
                setUpdate({
                    name: task.name ?? '',
                    description: task.description ?? '',
                    status: String(task.status ?? '1'),
                    priority: String(task.priority ?? '1'),
                    date: task.expirationDate ?? null,
                    folderID: folderData ? folderData.folder_id : 0
                });
            }
        }

        loadTaskData();
    }, [task, idTask])

    const handleUpdate = async () => {
        setLoading(true)
        try {
            const valuesUpdate = {
                name: update.name,
                description: update.description,
                status: update.status,
                priority: update.priority,
                expirationDate: update.date,
                folderID: update.folderID,
            }
            
            await updateTask(idTask, valuesUpdate)
            
            // Recargar el contenido de la carpeta si esta en una página de carpeta
            if (params?.id) {
                await FolderContent(Number(params.id))
            }

        } catch (error) {
            console.error(error)
            toast.error('Error actualizando')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="cursor-pointer hover:text-white transition-colors">
                    <SquarePen className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader>
                    <DialogTitle>Editar tarea</DialogTitle>
                    <DialogDescription>
                        Modifica los campos y pulsa 'Actualizar'.
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault() }}>
                    <input
                        type="text"
                        required
                        placeholder="Nombre"
                        onChange={(e) => setUpdate({ ...update, name: e.target.value })}
                        value={update.name}
                        maxLength={100}
                        className="p-2 rounded-lg border- border-border py-2 bg-primary"
                    />
                    <textarea
                        placeholder="Descripción"
                        onChange={(e) => setUpdate({ ...update, description: e.target.value })}
                        value={update.description}
                        maxLength={270}
                        className="p-2 rounded-lg h-35 resize-none border-1 border-border py-2 bg-primary"
                    />
                    <select
                        value={update.status}
                        onChange={(e) => setUpdate({ ...update, status: e.target.value })}
                        className="p-2 rounded-lg border-1 border-border py-2 bg-primary">
                        <option value="1">Por hacer</option>
                        <option value="2">En progreso</option>
                        <option value="3">Hecho</option>
                    </select>
                    <select
                        value={update.priority}
                        onChange={(e) => setUpdate({ ...update, priority: e.target.value })}
                        className="p-2 rounded-lg border-1 border-border py-2 bg-primary">
                        <option value="1">Baja</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                    </select>

                    <select
                        value={update.folderID}
                        onChange={(e) => setUpdate({ ...update, folderID: parseInt(e.target.value) })}
                        className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]"
                    >
                        <option value="">Sin carpeta</option>
                        {
                            folders.map((folder: FolderProps) => (
                                <option key={folder.id} value={folder.id}>{folder.name}</option>
                            ))
                        }
                    </select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="default"
                                className="w-full flex items-center flex-row justify-start text-left font-normal p-2 rounded-lg"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {update.date ? format(new Date(update.date), "dd/MM/yyyy") : "Seleccionar fecha"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-primary">
                            <Calendar
                                fixedWeeks
                                mode="single"
                                selected={update.date ? new Date(update.date) : undefined}
                                onSelect={(date) => setUpdate({ ...update, date: date ? date.toISOString() : null })}
                                className="bg-primary border-1 border-border rounded-lg"
                            />
                        </PopoverContent>
                    </Popover>

                    <div className="text-muted-foreground px-1 text-sm">
                        {update.date ? (
                            <div>
                                Fecha de vencimiento seleccionada: {""}
                                <span className="font-medium">{formatDateString(update.date ? new Date(update.date) : null)}</span>.
                            </div>
                        ) : (
                            "Selecciona una fecha de vencimiento"
                        )}
                    </div>
                </form>

                <DialogFooter className="flex items-center justify-between">
                    <DialogClose>
                        <span className="bg-primary border-1 border-border text-white/80 px-4 py-2 hover:text-white hover:bg-[#1c1c1c] rounded-md text-sm font-medium transition-all cursor-pointer">Cancelar</span>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button variant={"white"} onClick={handleUpdate} disabled={loading}>
                            {loading ? (
                                <div className="flex items-center justify-center gap-1">
                                    <Spinner />
                                    <span>Actualizando...</span>
                                </div>
                            ) : 'Actualizar'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTask