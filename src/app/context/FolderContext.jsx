import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
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
    const [loading, setLoading] = useState(false)
    const [folderContent, setFolderContent] = useState([])
    const [foldersLoaded ,setFoldersLoaded] = useState(false)

    useEffect(() => {
        getFolders();
    }, []);

    const createFolder = async (folderData) => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log("No se pudo obtener el usuario autenticado");
            return;
        }
        try {
            const { error, data } = await supabase.from("folders").insert({
                name: folderData.name,
                userID: user.id,
            })
                .select();

            if (error) throw error;

            setFolders([...folders, ...data])
            console.log(data)

        } catch (error) {
            console.log(error)
            toast.error("Error al crear la carpeta")
            return;
        } finally {
            setLoading(false);
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



    const FolderContent = useCallback(async (idPage) => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                console.log("No se pudo obtener el usuario autenticado");
                return;
            }

            const { data, error } = await supabase
                .from("folders")
                .select(`
                *,
                folder_tasks (
                    task_id,
                    tasks (*)
                )
            `)
                .eq("userID", user.id)
                .eq("id", idPage)
                .single();

            if (error) {
                console.log(error);
                return;
            }

            setFolderContent(data ? [data] : []);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar el contenido");
        } finally {
            setLoading(false);
        }
    }, []);

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

            if (error) throw error;

            console.log(data)
            setFolders(folders.filter((folder) => folder.id != idFolder))

        } catch (error) {
            console.log(error)
            toast.error("Error al eliminar la carpeta")
            return;
        }
    }

    const getFolderTasks = async (folderId) => {
        try {
            const { data, error } = await supabase
                .from("folder_tasks")
                .select(`
                task_id,
                tasks (*)
            `)
                .eq("folder_id", folderId);

            if (error) throw error;
            return data;
        } catch (error) {
            console.log(error)
            toast.error("Error al obtener tareas de la carpeta")
            return [];
        }
    }

    const getFolders = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser()
        try {
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
            setFoldersLoaded(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <FolderContext.Provider
            value={{
                folders,
                setFolders,
                createFolder,
                updateFolder,
                deleteFolder,
                getFolders,
                FolderContent,
                folderContent,
                loading,
                getFolderTasks
            }}>
            {children}
        </FolderContext.Provider>
    )
}