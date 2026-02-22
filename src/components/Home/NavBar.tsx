"use client";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/app/backend/client";
import { Spinner } from "../ui/spinner";

export function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            N
          </div>
          <span className="text-lg font-semibold text-white">Notly</span>
        </div>

        <div className="items-center gap-3 md:flex">
          {user ? (
            loading ? (
              <Spinner />
            ) : (
              <Link
                href="/dashboard"
                className="bg-primary text-primary-foreground hover:bg-primary/70 h-9 px-4 py-2 rounded-xl text-sm font-medium transition-all border border-border"
              >
                Dashboard
              </Link>
            )
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="bg-primary text-primary-foreground hover:bg-primary/70 h-9 px-4 py-2 rounded-xl text-sm font-medium transition-all border border-border"
              >
                Comenzar ahora
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
