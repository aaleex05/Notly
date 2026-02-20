import { ArrowRight } from "lucide-react"
import { Badge } from "../ui/Badge"
import Link from "next/link"

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Badge variant="outline" className="mb-6 gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
          Nuevo: Editor de notas mejorado
          <ArrowRight className="size-3" />
        </Badge>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl md:leading-tight">
          Tu productividad,{" "}
          <span className="text-white/80">simplificada</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Organiza tareas, escribe notas con un editor rico y gestiona tus carpetas.
          Todo en un espacio minimalista y elegante.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/login" className="bg-primary flex items-center justify-center rounded-full hover:bg-primary/70 px-6 py-2 text-primary-foreground transition-colors cursor-pointer">
            Comenzar gratis
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Sin tarjeta de credito. Gratis para siempre.
        </p>
      </div>
    </section>
  )
}
