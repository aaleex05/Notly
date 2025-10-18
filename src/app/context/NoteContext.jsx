import React, { createContext, useContext, useState } from "react"
import { supabase } from "../backend/client"
import { toast } from "sonner"

export const NoteContext = createContext()

export const useTask = () => {
    const context = useContext(NoteContext)
    if (!context) throw new Error('useTask tiene que utilizarse con TaskContextProvider')
    return context
}

export const NoteContextProvider = ({ children }) => {

    return (
        <NoteContext.Provider
            value={{}}>
            {children}
        </NoteContext.Provider>
    )

}