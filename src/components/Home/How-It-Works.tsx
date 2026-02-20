export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Crea tu cuenta",
      description:
        "Registrate en segundos. Sin complicaciones, sin datos de pago.",
    },
    {
      number: "02",
      title: "Organiza tu espacio",
      description:
        "Crea carpetas para agrupar tus proyectos, ideas y tareas pendientes.",
    },
    {
      number: "03",
      title: "Escribe y gestiona",
      description:
        "Usa el editor rico para tus notas y el sistema de tareas para mantener el control.",
    },
  ];

  return (
    <section id="how-it-works" className="px-6 flex items-center ">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary">
            Como funciona
          </p>
          <h2 className="text-balance text-3xl font-bold text-white/70 md:text-5xl">
            Empieza en 3 pasos
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
            >
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 hidden h-px w-full bg-border/50 md:block" />
              )}
              <div className="relative z-10 mb-6 flex size-16 items-center justify-center rounded-full border border-border bg-primary">
                <span className="text-xl font-bold text-white/80">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
