"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./backend/client";
import { Spinner } from "@/components/ui/spinner";
import TaskForm from "@/components/TaskForm";
import { TaskContextProvider, useTask } from "./context/TaskContext";
import NavBar from "@/components/NavBar";
import TaskList from "@/components/TaskList";

export function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showTaskDone, setShowTaskDone] = useState(false)
  const router = useRouter();


  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
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
    <div className="font-sans p-10">
      <NavBar />
      <div className="flex flex-col pt-20 items-center justify-center min-h-auto">
        <button
          onClick={() => setShowTaskDone(!showTaskDone)}
          className="bg-gray-800 hover:bg-gray-700 py-2 px-5 cursor-pointer rounded-2xl my-5">{showTaskDone ? 'Show tasks to do' : 'Show tasks done'}</button>
        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <TaskContextProvider>
      <HomeContent />
    </TaskContextProvider>
  )
}
