"use client"

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNote } from "@/app/context/NoteContext";
import NoteCard from "./NoteCard";
import Button from "../ui/buttonStyle";

interface NoteProps {
    id: number;
    title: string;
    content: string;
}

function SortableNote({ note }: { note: NoteProps }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: note.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : "auto",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`
                rounded-lg cursor-grab active:cursor-grabbing
                ${isDragging ? "ring-2 ring-white shadow-lg shadow-white/20 overflow-hidden" : ""}
            `}
        >
            <NoteCard note={note} />
        </div>
    );
}

export default function NotesList() {
    const { notes, setNotes, loading } = useNote();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = notes.findIndex((n: { id: UniqueIdentifier; }) => n.id === active.id);
        const newIndex = notes.findIndex((n: { id: UniqueIdentifier; }) => n.id === over.id);
        setNotes(arrayMove(notes, oldIndex, newIndex));
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
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
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={notes.map((n: { id: UniqueIdentifier; }) => n.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="p-4 space-y-2">
                    {notes.map((note: NoteProps) => (
                        <SortableNote key={note.id} note={note} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}