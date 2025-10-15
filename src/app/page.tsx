"use client"

import NavBar from "@/components/NavBar";


export function HomeContent() {

  return (
    <div className="font-sans p-10">
      <NavBar />
    </div>
  );
}

export default function Home() {
  return (
      <HomeContent />
  )
}
