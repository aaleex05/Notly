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
import Button, { buttonVariants } from "./ui/buttonStyle"
import TaskForm from "./TaskForm"

interface CreateTaskProps {
    variante: "default" | "white" | "outline" | "secondary" | "ghost" | "link"
    text: string
    size: "default" | "sm" | "lg" | "icon"
}


function CreateTask({variante, text, size}: CreateTaskProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variante} size={size}>{text}</Button>
            </DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader>
                    <DialogTitle>Crear Tarea</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <TaskForm/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTask