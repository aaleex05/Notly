import {
  CheckSquare,
  FileText,
  FolderOpen,
  Sparkles,
  Lock,
  Zap,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: CheckSquare,
      title: "Tareas (To-Do)",
      description:
        "Crea, organiza y completa tareas con facilidad. Mantente enfocado en lo que importa.",
    },
    {
      icon: FileText,
      title: "Notas con editor rico",
      description:
        "Escribe notas con formato completo: negritas, listas, encabezados y mas. Todo al instante.",
    },
    {
      icon: FolderOpen,
      title: "Carpetas organizadas",
      description:
        "Agrupa tus notas y tareas en carpetas personalizadas para mantener todo en orden.",
    },
    {
      icon: Sparkles,
      title: "Interfaz minimalista",
      description:
        "Diseno oscuro y limpio que reduce distracciones y te mantiene en el flujo de trabajo.",
    },
    {
      icon: Zap,
      title: "Rapido y ligero",
      description:
        "Carga instantanea, sin esperas. Tu productividad no puede esperar.",
    },
    {
      icon: Lock,
      title: "Seguro y privado",
      description:
        "Tus datos son tuyos. Encriptacion de extremo a extremo para toda tu informacion.",
    },
  ];
  return (
    <section id="features" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white">
            Funciones
          </p>
          <h2 className="text-balance text-3xl font-bold text-white/70 md:text-5xl">
            Todo lo que necesitas, nada que sobre
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Herramientas esenciales de productividad en un solo lugar, sin la
            complejidad innecesaria.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-primary p-6 transition-all hover:border-primary/30 hover:bg-primary/80"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-border text-white/70 transition-colors">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
