import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Folder } from "lucide-react"
import FormFolder from "./FormFolder"
import { useState } from "react"

export default function FolderForm({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader>
                    <DialogTitle className="text-4xl flex gap-3 items-center">
                        <span className="bg-primary border p-2 rounded-lg"><Folder size={30} /></span>
                        Crear carpeta
                    </DialogTitle>
                </DialogHeader>
                <FormFolder setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
};