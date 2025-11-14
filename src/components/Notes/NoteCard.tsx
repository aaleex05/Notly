"use client"

import { useNote } from "@/app/context/NoteContext";
import { TextInitial } from "lucide-react";
import Button from "../ui/buttonStyle";

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
    const { selectNote, currentNoteId, setMostrarNota } = useNote();
    
    const handleShowNote = () => {
        selectNote(note);
        setMostrarNota(false);
    }

    const isSlected = selectNote && currentNoteId == note.id;

    return (
        <div>
            <Button 
                onClick={handleShowNote}
                className={`w-full flex gap-2 items-center text-md truncate ${isSlected ? "bg-white text-black hover:bg-white/40 hover:text-black" : ""}`}>
                <TextInitial />{truncateWords(note.title, 5)}
            </Button>
        </div>
    );
}