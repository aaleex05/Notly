"use client"

import FilterTask from '@/components/FilterTask'
import TaskList from '@/components/TaskList'
import { useEffect, useState } from 'react'
import { TaskContextProvider } from '../context/TaskContext'
import CreateTask from '@/components/CreateTask'
import { Spinner } from '@/components/ui/spinner'
import { supabase } from '../backend/client'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'

export function DashboardContent() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [showTaskDone, setShowTaskDone] = useState(false)


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
    <div className="h-dvh flex flex-col">
      <div className="p-4 flex justify-end">
        <CreateTask variante="default" />
      </div>

      <div className="flex-1">
        <TaskList done={showTaskDone} />
        {/* <FilterTask
    showTaskDone={showTaskDone}
    setShowTaskDone={setShowTaskDone}
  /> */}
      </div>
    </div>
  )
}

export default function Dashboard() {


  return (
    <TaskContextProvider>
      <DashboardContent />
    </TaskContextProvider>
  )
}