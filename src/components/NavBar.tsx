import React from 'react'
import { toast } from 'sonner';
import Link from "next/link";
import { supabase } from '@/app/backend/client';

function NavBar() {

    const handleLogout = async () => {
        try {
          await supabase.auth.signOut();
        } catch (error) {
          console.error("Error logging out:", error);
          toast.error("Error al cerrar sesión");
        }
      };

    return (
        <nav className="flex justify-center gap-5">
            <Link href="/" className="hover:bg-blue-800 bg-blue-600 py-2 px-5 rounded-full text-white">
                Home
            </Link>
            <Link href="/tasks/new" className="hover:bg-blue-800 bg-blue-600 py-2 px-5 rounded-full text-white">
                New Task
            </Link>
            <button
                className="hover:bg-red-800 bg-red-600 py-2 px-5 rounded-full text-white"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    )
}

export default NavBar