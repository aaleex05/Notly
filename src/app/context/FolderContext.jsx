import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../backend/client"
import { toast } from "sonner"

export const FolderContext = createContext()

export const useFolder = () => {
    const context = useContext(FolderContext)
    if (!context) throw new Error('useFolder tiene que utilizarse con FolderContextProvider')
    return context
}

export const FolderContextProvider = ({ children }) => {

    const [folders, setFolders] = useState([])
    useEffect(() => {
        getFolders();
    }, []);

    const createFolder = async (folderData) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log("No se pudo obtener el usuario autenticado");
            return;
        }
        try {
            const { error, data } = await supabase.from("folders").insert({
                name: folderData.name,
                idNote: folderData.idNotes,
                idTask: folderData.idTasks,
                userID: user.id,
            })
                .select();

            setFolders([...notes, ...data])
            console.log(data)
            return data; // Retornar los datos para obtener el ID

        } catch (error) {
            console.log(error)
            toast.error("Error al crear la carpeta")
            return;
        }
    }

    const updateFolder = async (idFolder, folderData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                console.log("No se pudo obtener el usuario autenticado");
                return;
            }

            const { data, error } = await supabase
                .from("folders")
                .update({
                    name: folderData.name,
                })
                .eq("id", idFolder)
                .eq("userID", user.id)
                .select();

            if (error) throw error;

            setFolders(folders.map((folder) =>
                (folder.id === idFolder ? { ...folder, ...folderData } : folder)
            ));

            return data;

        } catch (error) {
            console.log(error)
            toast.error("Error al actualizar la carpeta")
            return;
        }
    }

    const deleteFolder = async (idFolder) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                console.log("No se pudo obtener el usuario autenticado");
                return;
            }
            const { data, error } = await supabase
                .from("folders")
                .delete()
                .eq("id", idFolder)
                .eq("userID", user.id)
                .select();

            console.log(data)
            setFolders(folders.filter((folder) => folder.id != idFolder))

        } catch (error) {
            console.log(error)
            toast.error("Error al eliminar la carpeta")
            return;
        }

    }

    const getFolders = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log("No se pudo obtener el usuario autenticado");
            return;
        }

        const { data, error } = await supabase
            .from("folders")
            .select("*")
            .eq("userID", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.log(error)
            return;
        }

        setFolders(data || []);

    }

    return (
        <FolderContext.Provider
            value={{ 
                folders,
                setFolders,
                createFolder,
                updateFolder,
                deleteFolder,
                getFolders
                }}>
            {children}
        </FolderContext.Provider>
    )
}