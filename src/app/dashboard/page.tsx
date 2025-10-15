"use client"

import FilterTask from '@/components/FilterTask'
import TaskList from '@/components/TaskList'
import { useEffect, useState } from 'react'
import { TaskContextProvider, useTask } from '../context/TaskContext'
import { Spinner } from '@/components/ui/spinner'
import { supabase } from '../backend/client'
import { useRouter } from 'next/navigation'
import SideBar, { SideBarItem } from '@/components/SideBar'
import { LayoutDashboard } from 'lucide-react'

export function DashboardContent() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [showTaskDone, setShowTaskDone] = useState(false)
  const { expanded, setExpanded } = useTask()


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
    <div className="flex h-screen relative overflow-x-hidden">
      <SideBar>
        <SideBarItem icon={<LayoutDashboard />} text="Dashboard" href={"/"} />
      </SideBar>

      {expanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      <main className={`transition-all min-h-screen flex-1 ${
      expanded ? "ml-82" : "ml-18"
    }`}>
        <FilterTask
          showTaskDone={showTaskDone}
          setShowTaskDone={setShowTaskDone}
        />
        <TaskList done={showTaskDone} />
      </main>
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