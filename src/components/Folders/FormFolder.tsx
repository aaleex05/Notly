import Button from "../ui/buttonStyle"
import { FolderContextProvider, useFolder } from "@/app/context/FolderContext"
import { Folder } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function FormFolder({ setOpen }: { setOpen: (open: boolean) => void }) {
    const { createFolder } = useFolder()

    const [folderData, setFolderData] = useState<{ name: string }>({
        name: ""
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createFolder(folderData, setFolderData)
        console.log(folderData)
        toast.success("Carpeta creada correctamente")
        setFolderData({ name: "" })
        setOpen(false)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Nombre de la carpeta"
                    onChange={(e) => setFolderData({ ...folderData, name: e.target.value })}
                    className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]"
                />
                <Button type="submit" variant={"white"}>Crear Carpeta</Button>
            </div>
        </form>
    )
}