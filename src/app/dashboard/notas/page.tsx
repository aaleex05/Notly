"use client";

import { useNote } from "@/app/context/NoteContext";
import NoteForm from "@/components/Notes/NoteForm";
import NoteList from "@/components/Notes/NoteList";

export default function Notas() {
  const { mostrarNota } = useNote();

  return (
    <div className="grid lg:grid-cols-5 lg:grid-rows-5 lg:gap-4 h-full lg:p-5 relative">
      <div className={`
        lg:row-span-5 bg-foreground lg:w-full lg:h-full rounded-lg border border-border overflow-y-auto transition-all duration-500 ease-in-out absolute lg:relative inset-0 lg:inset-auto
        ${mostrarNota
          ? 'scale-100 opacity-100 pointer-events-auto m-5 lg:m-0'
          : 'scale-95 opacity-0 pointer-events-none lg:scale-100 lg:opacity-100 lg:pointer-events-auto'
        }
      `}>
        <NoteList />
      </div>

      <div className={`lg:col-span-4 lg:row-span-5 lg:block bg-foreground lg:w-full lg:h-full rounded-lg border border-border p-4 overflow-y-auto transition-all duration-500 ease-in-out absolute lg:relative inset-0 lg:inset-auto
        ${!mostrarNota
          ? 'scale-100 opacity-100 pointer-events-auto m-5 lg:m-0'
          : 'scale-95 opacity-0 pointer-events-none lg:scale-100 lg:opacity-100 lg:pointer-events-auto'
        }
      `}>
        <NoteForm />
      </div>
    </div>
  )
}