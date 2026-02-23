import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../backend/client"
import { toast } from "sonner"

export const NoteContext = createContext()

export const useNote = () => {
    const context = useContext(NoteContext)
    if (!context) throw new Error('useNote tiene que utilizarse con NoteContextProvider')
    return context
}

export const NoteContextProvider = ({ children }) => {

    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState(null)
    const [currentTitle, setCurrentTitle] = useState("")
    const [currentContent, setCurrentContent] = useState("")
    const [currenFolder, setCurrentFolder] = useState("")
    const [ mostrarNota, setMostrarNota ] = useState(false);
    useEffect(() => {
        getNotes();
    }, []);

    const createNote = async (noteData) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log("No se pudo obtener el usuario autenticado");
            return;
        }
        try {
            const { error, data } = await supabase.from("notes").insert({
                title: noteData.title,
                content: noteData.content,
                userID: user.id,
            })
                .select();

            setNotes([...notes, ...data])
            console.log(data)
            return data; // Retornar los datos para obtener el ID

        } catch (error) {
            console.log(error)
            toast.error("Error al añadir la nota")
            return;
        }
    }

    const updateNote = async (idNote, noteData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                console.log("No se pudo obtener el usuario autenticado");
                return;
            }

            const { data, error } = await supabase
                .from("notes")
                .update({
                    title: noteData.title,
                    content: noteData.content,
                })
                .eq("id", idNote)
                .eq("userID", user.id)
                .select();

            if (error) throw error;

            setNotes(notes.map((note) =>
                (note.id === idNote ? { ...note, ...noteData } : note)
            ));

            return data;

        } catch (error) {
            console.log(error)
            toast.error("Error al actualizar la nota")
            return;
        }
    }

    const deleteNote = async (idNote) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                console.log("No se pudo obtener el usuario autenticado");
                return;
            }
            const { data, error } = await supabase
                .from("notes")
                .delete()
                .eq("id", idNote)
                .eq("userID", user.id)
                .select();

            console.log(data)
            setNotes(notes.filter((note) => note.id != idNote))

        } catch (error) {
            console.log(error)
            toast.error("Error al eliminar la nota")
            return;
        }

        if (idNote == currentNoteId) {
            setCurrentNoteId(null)
            setCurrentTitle("")
            setCurrentContent("")
        }

    }

    const getNotes = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log("No se pudo obtener el usuario autenticado");
            return;
        }

        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("userID", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.log(error)
            return;
        }

        setNotes(data || []);

    }

    const selectNote = (note) => {
        setCurrentNoteId(note.id)
        setCurrentTitle(note.title)
        setCurrentContent(note.content)
        setCurrentFolder(note.folderID)
    }

    const newNote = () => {
        setCurrentNoteId(null)
        setCurrentTitle("Sin título")
        setCurrentContent("")
    }

    return (
        <NoteContext.Provider
            value={{ 
                createNote, 
                updateNote, 
                deleteNote, 
                notes, 
                getNotes,
                currentNoteId,
                currentTitle,
                currentContent,
                setCurrentTitle,
                setCurrentContent,
                selectNote,
                newNote,
                deleteNote,
                mostrarNota,
                setMostrarNota
                }}>
            {children}
        </NoteContext.Provider>
    )
}