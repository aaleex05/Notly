"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { supabase } from "../backend/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Header } from "@/components/DashboardHome/header";
import { StatsRow } from "@/components/DashboardHome/stats-row";
import TasksToday from "@/components/DashboardHome/task-today";
import { DailyProgress } from "@/components/DashboardHome/daily-progress";
import QuickActions from "@/components/DashboardHome/quick-actions";

export function DashboardContent() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <Header />
        <div className="mt-8">
          <StatsRow />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <TasksToday />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <DailyProgress />
            <QuickActions />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
