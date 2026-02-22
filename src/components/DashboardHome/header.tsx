"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "@/app/backend/client";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos dias";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

export function Header() {
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user?.user_metadata.display_name || user?.email || "Usuario");
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const greeting = getGreeting();
  const dateStr = format(now, "EEEE, d 'de' MMMM", { locale: es });
  const timeStr = format(now, "HH:mm");

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
          {greeting}, {user}
        </h1>
        <p className="text-sm capitalize text-muted-foreground">{dateStr}</p>
      </div>
      <span className="text-3xl font-light tabular-nums text-muted-foreground lg:text-4xl">
        {timeStr}
      </span>
    </div>
  );
}
