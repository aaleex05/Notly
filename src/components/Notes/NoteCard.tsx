"use client"

import { useNote } from "@/app/context/NoteContext";
import { TextInitial } from "lucide-react";
import Button from "../ui/buttonStyle";
import { useState } from "react";

type Note = {
    id: number;
    title: string;
    content: string;
    list?: number;
}

interface NoteCardProps {
    note: Note;
}

function truncateWords(text: string, limite: number): string {
    const palabras = text.split(' ');
    if (palabras.length <= limite) return text;
    return palabras.slice(0, limite).join(' ') + '...';
}

export default function NoteCard({ note }: NoteCardProps) {
    const { selectNote, notes, updateNote, currentNoteId } = useNote();
    
    const handleShowNote = () => {
        selectNote(note);
    }

    const isSlected = selectNote && currentNoteId == note.id;

    // const startDrag = (e: React.DragEvent<HTMLButtonElement>) => {
    //     e.dataTransfer.setData('noteID', note.id.toString())
    //     console.log(note)
    // }
    
    // const draggInOver = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault()
    // }

    // const onDrop = (e: React.DragEvent<HTMLDivElement>, list: number) => {
    //     e.preventDefault()
    //     const noteID = Number(e.dataTransfer.getData("noteID"))
    //     const item = notes.find((n: Note) => n.id === noteID)
        
    //     if (item) {
    //         const updatedNote = { ...item, list: list }
    //         updateNote(updatedNote)
    //     }
    // }

    return (
        <div>
            <Button 
                // draggable={true}
                // onDragStart={startDrag}
                onClick={handleShowNote}
                className={`w-full flex gap-2 items-center text-md truncate ${isSlected ? "bg-white text-black hover:bg-white/40 hover:text-black" : ""}`}>
                <TextInitial />{truncateWords(note.title, 5)}
            </Button>
        </div>
    );
}