import { useFolder } from "@/app/context/FolderContext";
import FolderCard from "./FolderCard";
import { Folder } from "lucide-react";
import CreateTask from "../To-do/CreateTask";
import FolderForm from "./FolderForm";
import Button from "../ui/buttonStyle";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";

export function FoldersList() {
    const { folders, loading, getFolders } = useFolder();
    if (loading) return <div className="flex items-center h-full justify-center"><Spinner/></div>;

    interface FolderProps {
        id: number;
        name: string;
    }

    if (folders.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 justify-center h-screen text-white/80">
                <div className="bg-primary border p-6 rounded-full">
                    <Folder size={60} />
                </div>
                <h1 className="text-2xl mb-2 font-semibold">Empieza creando tu primera tarea.</h1>
                <FolderForm>
                    <Button variant="white" size='default' className='flex gap-3 items-center'>
                        Crear carpeta
                    </Button>
                </FolderForm>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-5 mt-5 ml-4">
            {folders.map((folder: FolderProps) => (
                <FolderCard key={folder.id} folder={folder} />
            ))}
        </div>
    );
}