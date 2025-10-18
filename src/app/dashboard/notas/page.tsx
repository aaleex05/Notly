"use client";

import { NoteContextProvider } from "@/app/context/NoteContext";
import NoteForm from "@/components/Notes/NoteForm";
import NotesList from "@/components/Notes/NoteList";
import NoteList from "@/components/Notes/NoteList";

export default function Notas() {

  return (
    <NoteContextProvider>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 h-full p-5">
        <div className="row-span-5 bg-foreground w-full h-full rounded-lg border border-border overflow-y-auto">
          <NoteList/>
        </div>
        <div className="col-span-4 row-span-5 bg-foreground w-full h-full rounded-lg border border-border p-4 overflow-y-auto">
          <NoteForm/>
        </div>
      </div>
    </NoteContextProvider>
  )
}