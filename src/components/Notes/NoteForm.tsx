"use client"

import { useTask } from "@/app/context/NoteContext";
import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Undo2,
    Redo2,
    Heading1,
    Heading2,
    CloudCheck,
    Trash2
} from "lucide-react";
import Button from "../ui/buttonStyle";
import { toast } from "sonner";

export default function NoteForm() {
    const {
        currentNoteId,
        currentTitle,
        currentContent,
        setCurrentTitle,
        setCurrentContent,
        createNote,
        updateNote,
        newNote,
        selectNote,
        deleteNote
    } = useTask();

    const [isSaving, setIsSaving] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: 'Escribe tu nota aquí...',
            }),
        ],
        content: currentContent || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
            },
        },
        onUpdate: ({ editor }) => {
            setCurrentContent(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && currentContent !== editor.getHTML()) {
            editor.commands.setContent(currentContent || '');
        }
    }, [currentNoteId]);

    useEffect(() => {
        // Limpiar timeout anterior
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // No guardar si no hay contenido
        if (!currentTitle.trim() && !currentContent.trim()) {
            return;
        }

        setIsSaving(true);

        saveTimeoutRef.current = setTimeout(async () => {
            try {
                const noteData = {
                    title: currentTitle || "Sin título",
                    content: currentContent,
                };

                if (currentNoteId) {
                    await updateNote(currentNoteId, noteData);
                } else {
                    const data = await createNote(noteData);

                    if (data && data[0]) {
                        // Actualizar el currentNoteId después de crear
                        selectNote(data[0]);
                    }
                }
            } catch (error) {
                toast.error("Error al guardar");
            } finally {
                setIsSaving(false);
            }
        }, 1000);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [currentTitle, currentContent]);

    if (!editor) {
        return <div>Cargando editor...</div>;
    }

    const handleDeleteNote = () => {
        deleteNote(currentNoteId)
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Título de la nota..."
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    maxLength={50}
                    className="text-2xl w-full font-bold border-none outline-none focus:ring-0 p-2"
                />
                {(currentNoteId || currentTitle || currentContent) && (
                    <div
                        className={`text-sm w-fit p-1.5 rounded-full transition-colors duration-300 
                            ${isSaving
                                ? 'text-white/60 bg-white/40'
                                : 'text-white/40 bg-white/20'
                            }`}
                    >
                        <CloudCheck />
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-1 border-b pb-2">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded-full hover:bg-white/40 disabled:opacity-30"
                    title="Deshacer (Ctrl+Z)"
                >
                    <Undo2 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded-full hover:bg-white/40 disabled:opacity-30"
                    title="Rehacer (Ctrl+Y)"
                >
                    <Redo2 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('bold') ? 'bg-white/40' : ''
                        }`}
                    title="Negrita (Ctrl+B)"
                >
                    <Bold size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('italic') ? 'bg-white/40' : ''
                        }`}
                    title="Cursiva (Ctrl+I)"
                >
                    <Italic size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('strike') ? 'bg-white/40' : ''
                        }`}
                    title="Tachado"
                >
                    <Strikethrough size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('bulletList') ? 'bg-white/40' : ''
                        }`}
                    title="Lista con viñetas"
                >
                    <List size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('orderedList') ? 'bg-white/40' : ''
                        }`}
                    title="Lista numerada"
                >
                    <ListOrdered size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('heading', { level: 1 }) ? 'bg-white/40' : ''
                        }`}
                    title="Título 1"
                >
                    <Heading1 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded-full hover:bg-white/40 ${editor.isActive('heading', { level: 2 }) ? 'bg-white/40' : ''
                        }`}
                    title="Título 2"
                >
                    <Heading2 size={18} />
                </button>

                <div className="ml-auto flex items-center gap-2">
                    <Button onClick={newNote}>Nueva nota</Button>
                    <Button onClick={handleDeleteNote}><Trash2/></Button>
                </div>
            </div>

            <div className="border rounded-lg h-full overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}