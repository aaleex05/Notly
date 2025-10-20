"use client"

import { useTask } from "@/app/context/NoteContext";
import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import UnderlineExtension from '@tiptap/extension-underline';
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
    Trash2,
    Underline,
    Heading3
} from "lucide-react";
import Button from "../ui/buttonStyle";
import { toast } from "sonner";
import { IconBlockquote } from "@tabler/icons-react";


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
            UnderlineExtension,
        ],
        content: currentContent || '',
        editorProps: {
            attributes: {
                class: 'editor-prose focus:outline-none min-h-[200px] p-4',
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
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

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
        if (!currentNoteId) {
            toast.error("No hay nota para eliminar");
            return;
        }
        deleteNote(currentNoteId);
        toast.success("Nota eliminada");
    }

    const stylePickerHover = `p-2 rounded-lg hover:bg-white/20`
    const stylePicker = 'bg-primary border border-border text-white/80 hover:text-white hover:bg-[#1c1c1c]'

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
                        className={`text-sm w-fit p-1.5 rounded-lg transition-colors duration-300 
                            ${isSaving
                                ? 'text-white/60 bg-[#111111] border'
                                : 'text-white/40 bg-[#12212] border'
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
                    className={`${stylePickerHover} disabled:opacity-30`}
                    title="Deshacer (Ctrl+Z)"
                >
                    <Undo2 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className={`${stylePickerHover} disabled:opacity-30`}
                    title="Rehacer (Ctrl+Y)"
                >
                    <Redo2 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`${stylePickerHover} ${editor.isActive('bold') ? stylePicker : ''}`}
                    title="Negrita (Ctrl+B)"
                >
                    <Bold size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`${stylePickerHover} ${editor.isActive('italic') ? stylePicker : ''}`}
                    title="Cursiva (Ctrl+I)"
                >
                    <Italic size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`${stylePickerHover} ${editor.isActive('underline') ? stylePicker : ''}`}
                    title="Subrayado"
                >
                    <Underline size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`${stylePickerHover} ${editor.isActive('strike') ? stylePicker : ''}`}
                    title="Tachado"
                >
                    <Strikethrough size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${stylePickerHover} ${editor.isActive('bulletList') ? stylePicker : ''}`}
                    title="Lista desordenada"
                >
                    <List size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${stylePickerHover} ${editor.isActive('orderedList') ? stylePicker : ''}`}
                    title="Lista ordenada"
                >
                    <ListOrdered size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`${stylePickerHover} ${editor.isActive('heading', { level: 1 }) ? stylePicker : ''}`}
                    title="Título 1"
                >
                    <Heading1 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${stylePickerHover} ${editor.isActive('heading', { level: 2 }) ? stylePicker : ''}`}
                    title="Título 2"
                >
                    <Heading2 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`${stylePickerHover} ${editor.isActive('heading', { level: 3 }) ? stylePicker : ''}`}
                    title="Título 3"
                >
                    <Heading3 size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`${stylePickerHover} ${editor.isActive('blockquote') ? stylePicker : ''}`}
                    title="Cita"
                >
                    <IconBlockquote size={18} />
                </button>

                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={`${stylePickerHover} ${editor.isActive('horizontalRule') ? stylePicker : ''}`}
                    title=""
                >
                    <IconBlockquote size={18} />
                </button>

                <div className="ml-auto flex items-center gap-2">
                    <Button onClick={newNote}>Nueva nota</Button>
                    {currentNoteId && (
                        <Button title="Eliminar nota" onClick={handleDeleteNote}>
                            <Trash2 size={22} />
                        </Button>
                    )}
                </div>
            </div>

            <div className="border rounded-lg h-full scroll-smooth p-0 no-scrollbar overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}