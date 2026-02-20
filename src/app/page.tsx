"use client"

import { CTA } from "@/components/Home/Cta"
import { Features } from "@/components/Home/Features"
import { Hero } from "@/components/Home/Hero"
import HowItWorks from "@/components/Home/How-It-Works"
import { NavBar } from "@/components/Home/NavBar"
import Footer from "@/components/Home/Footer"

export default function Home() {
  return (
        <div>
          <NavBar />
          <Hero />
          <Features />
          <HowItWorks />
          <CTA />
          <Footer />
        </div>
  )
}
