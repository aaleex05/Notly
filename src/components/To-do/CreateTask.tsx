import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TaskForm from "./TaskForm"
import { ReactNode, useState } from "react"
import { ListChecks } from "lucide-react"


function CreateTask({children}: {children: ReactNode}) {

    const [openForm, setOpenForm] = useState(false)

    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader>
                    <DialogTitle className="text-4xl flex gap-3 items-center">
                        <span className="bg-primary border p-2 rounded-lg"><ListChecks size={30} /></span>
                        Crear tarea
                    </DialogTitle>
                </DialogHeader>
                <TaskForm setOpenForm={setOpenForm} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateTask