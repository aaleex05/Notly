"use client"

import { useTask } from "@/app/context/NoteContext";
import { TextInitial } from "lucide-react";
import Button from "../ui/buttonStyle";

interface NoteCardProps {
    note: {
        id: number;
        title: string;
        content: string;
    }
}

function truncateWords(text: string, limite: number): string {
    const palabras = text.split(' ');
    if (palabras.length <= limite) return text;
    return palabras.slice(0, limite).join(' ') + '...';
}



export default function NoteCard({ note }: NoteCardProps) {
    const { selectNote  } = useTask();
    const handleShowNote = () => {
        selectNote(note);
    }

    return (
        <div>
            <Button 
            onClick={handleShowNote}
            className="w-full flex gap-2 items-center text-md truncate"><TextInitial />{truncateWords(note.title, 5)}</Button>
        </div>
    );
}