
import { LogOut, ChevronLast, ChevronFirst, FilePlus, User } from "lucide-react"
import { useContext, createContext, useState } from "react"
import CreateTask from "./To-do/CreateTask"
import Link from "next/link"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "./ui/buttonStyle"
import { supabase } from "@/app/backend/client"
import { useTask } from "@/app/context/TaskContext"



export default function SideBar({ children }) {
    const { expanded, setExpanded } = useTask()

    const [noUser, setNoUser] = useState(false);


    const LogOutAlert = () => {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button><LogOut className="cursor-pointer text-white/80 hover:text-white" size={`${expanded ? "22" : "20"}`} /></button>
                </DialogTrigger>
                <DialogContent className="dark">
                    <DialogHeader>
                        <DialogTitle>Cerrar Sesión</DialogTitle>
                        <DialogDescription>
                            ¿Estas seguro que quieres cerrar la sesión?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex items-center justify-between">

                        <DialogClose>
                            <span className="bg-primary border-1 border-border text-white/80 px-4 py-2 hover:text-white hover:bg-[#1c1c1c] rounded-md text-sm font-medium transition-all cursor-pointer disabled:opacity-50 outline-none">Cancelar</span>
                        </DialogClose>
                        <Button variant={"white"} onClick={handleLogout}>Cerrar Sesión</Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Error al cerrar sesión");
        }
    };

    const getUserName = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            document.getElementById("userName").textContent = user.user_metadata.display_name
        } else {
            document.getElementById("userName").textContent = ""
            setNoUser(true)
        }
    }

    const getUserEmail = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            document.getElementById("userEmail").textContent = user.email
        } else {
            document.getElementById("userEmail").textContent = "No hay email"
        }
    }

    getUserName()
    getUserEmail()

    return (
        <aside className={`h-dvh transition-all fixed mr-5 duration-300 z-50 ${expanded ? "w-80" : "w-18"
            }`}>
            <nav className="h-full flex flex-col bg-foreground">
                <div className={`p-4 flex justify-between items-center ${expanded ? "" : "flex-col gap-2"}`}>
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className={`p-1.5 rounded-lg bg-primary border-1 border-border text-white/80 hover:text-white hover:bg-[#1c1c1c] cursor-pointer ${expanded ? "order-1" : ""}`}
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <hr className="mx-4 border-border" />

                <ul className="flex-1 px-3 pt-4">
                    {children}
                </ul>
                <div className={`flex items-center ${expanded ? "p-3" : "py-1 px-2 hover:bg-[#1c1c1c]"} justify-between rounded-lg bg-primary border-1 border-border m-4`}>
                    <div
                        className={`flex items-center gap-3 overflow-hidden transition-all ${expanded ? "w-52 " : "w-0"}`}>
                        <User size={25} />
                        <div className="leading-4">
                            <h4 id="userName" className="font-semibold"></h4>
                            <h4 id="userEmail" className={`${noUser ? "font-semibold text-sm" : "text-xs text-gray-400"}`}></h4>
                        </div>
                    </div>
                    <LogOutAlert />
                </div>
            </nav>
        </aside>
    )
}

export function SideBarItem({ icon, text, href }) {
    const { expanded } = useTask()

    return (
        <div>
            <Link
                href={href}
                className="
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group bg-primary border-1 border-border text-white/80 hover:text-white hover:bg-[#1c1c1c]"
            >
                {expanded ? <span className="flex gap-3">{icon} {text}</span> : icon}

                {!expanded && (
                    <div
                        className={`absolute left-full flex items-center rounded-md px-2 justify-center py-1 ml-6 bg-primary border-1 border-border text-white/80 w-15 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </Link>
        </div>
    )
}