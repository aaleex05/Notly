import { ListPlus, FilePlus2, FolderPlus } from "lucide-react";
import CreateTask from "../To-do/CreateTask";
import FolderForm from "../Folders/FolderForm";
import { useNote } from "@/app/context/NoteContext";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const actions = [
    { icon: ListPlus, label: "Nueva tarea", color: "text-orange-500" },
    { icon: FilePlus2, label: "Nueva nota", color: "text-green-500" },
    { icon: FolderPlus, label: "Nueva carpeta", color: "text-blue-500" },
  ];

  const { createNote } = useNote()
  const router = useRouter()
  
      const createNewNote = () => {
          router.push('/dashboard/notas')
          createNote({ title: "", content: "" })
      }

  return (
    <div className="border-border border bg-primary rounded-lg p-4">
      <div className="pb-5 justify-between flex items-center">
        <h1 className="text-sm font-medium text-muted-foreground">
          Acciones rapidas
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const styleButton = `w-full cursor-pointer flex items-center gap-3 text-sm font-medium ${action.color} bg-white/10 hover:bg-white/20 transition-colors py-2 px-3 rounded-lg`;
          return (
            <div key={index}>
              {action.label === "Nueva tarea" ? (
                <CreateTask>
                    <button className={styleButton}>
                        <Icon size={18} />
                        {action.label}
                    </button>
                </CreateTask>
              ) : action.label === "Nueva carpeta" ? (
                <FolderForm>
                    <button className={styleButton}>
                        <Icon size={18} />
                        {action.label}
                    </button>
                </FolderForm>
                ) : (
                <button className={styleButton} onClick={createNewNote}>
                    <Icon size={18} />
                    {action.label}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
