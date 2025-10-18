"use client"

import { useTask } from "@/app/context/NoteContext";
import NoteCard from "./NoteCard";
import Button from "../ui/buttonStyle";

export default function NotesList() {
    const { notes, loading } = useTask();

    interface NoteProps {
        id: number;
        title: string;
        content: string;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500">
                <Button className="w-full">No hay notas disponibles</Button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-2">
            {notes.map((note : NoteProps) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}