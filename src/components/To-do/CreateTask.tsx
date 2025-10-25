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
import TaskForm from "./TaskForm"
import { ReactNode, useState } from "react"


function CreateTask({children}: {children: ReactNode}) {

    const [openForm, setOpenForm] = useState(false)

    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader>
                    <DialogTitle>Crear Tarea</DialogTitle>
                    <DialogDescription>
                        Rellena el formulario para crear una nueva tarea.
                    </DialogDescription>
                </DialogHeader>
                <TaskForm setOpenForm={setOpenForm} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateTask