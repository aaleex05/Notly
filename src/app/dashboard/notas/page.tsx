"use client";

import { useNote } from "@/app/context/NoteContext";
import NoteForm from "@/components/Notes/NoteForm";
import NoteList from "@/components/Notes/NoteList";

export default function Notas() {
  const { mostrarNota } = useNote();

  return (
    <div className="grid xl:grid-cols-5 xl:grid-rows-5 xl:gap-4 h-full xl:p-5 relative">
      <div className={`
        xl:row-span-5 bg-foreground xl:w-full xl:h-full rounded-xl border border-border overflow-y-auto transition-all duration-500 ease-in-out absolute xl:relative inset-0 xl:inset-auto
        ${mostrarNota
          ? 'scale-100 opacity-100 pointer-events-auto m-5 xl:m-0'
          : 'scale-95 opacity-0 pointer-events-none xl:scale-100 xl:opacity-100 xl:pointer-events-auto'
        }
      `}>
        <NoteList />
      </div>

      <div className={`xl:col-span-4 xl:row-span-5 xl:block bg-foreground xl:w-full xl:h-full rounded-xl border border-border p-4 overflow-y-auto transition-all duration-500 ease-in-out absolute xl:relative inset-0 xl:inset-auto
        ${!mostrarNota
          ? 'scale-100 opacity-100 pointer-events-auto m-5 xl:m-0'
          : 'scale-95 opacity-0 pointer-events-none xl:scale-100 xl:opacity-100 xl:pointer-events-auto'
        }
      `}>
        <NoteForm />
      </div>
    </div>
  )
}