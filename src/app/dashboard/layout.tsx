"use client"

import SideBar, { SideBarItem } from "@/components/SideBar";
import { ListChecks, HomeIcon, NotepadText, FilePlus } from "lucide-react";
import { TaskContextProvider, useTask } from "../context/TaskContext";
import CreateTask from "@/components/To-do/CreateTask";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <TaskContextProvider>
            <DashboardLayoutContent children={children} />
        </TaskContextProvider>
    );
}

export function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const { expanded, setExpanded } = useTask()
    
    return (
        <div>
            <div className="flex h-screen relative overflow-x-hidden">
                <SideBar>
                    <SideBarItem icon={<HomeIcon />} text="Inicio" href={"/dashboard"} />
                    <SideBarItem icon={<ListChecks />} text="To-Do" href={"/dashboard/to-do"} />
                    <SideBarItem icon={<NotepadText />} text="Notas" href={"/dashboard/notas"} />
                    
                </SideBar>

                {expanded && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setExpanded(false)}
                    />
                )}

                <main className={`transition-all min-h-screen flex-1 ${expanded ? "ml-82" : "ml-18"}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}