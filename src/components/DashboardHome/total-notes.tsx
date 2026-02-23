import { useNote } from "@/app/context/NoteContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TotalNotes() {
    const { notes, selectNote, setMostrarNota } = useNote();

    interface Note {
        id: string;
        title: string;
        content: string;
    }

    const handleShowNote = (note: Note) => {
        selectNote(note);
        setMostrarNota(false);
    }
    return (
        <div className="border-border border bg-primary rounded-lg py-7 px-6">
            <div className="pb-2 justify-between flex items-center">
                <h1 className="text-sm font-medium text-muted-foreground">
                    Total de notas
                </h1>
                <Link
                    href="/dashboard/notes"
                    className="text-sm font-medium text-muted-foreground flex items-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Ver todas
                    <ArrowRight className="ml-1 size-4" />
                </Link>
            </div>
            <div className="flex flex-col gap-3">
                {notes.map((note: Note) => (
                    <Link
                        href={`/dashboard/notes`}
                        onClick={() => handleShowNote(note)}
                        key={note.id}
                        className={"w-full cursor-pointer flex items-center gap-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors py-2 px-3 rounded-lg"}
                    >
                        {note.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}