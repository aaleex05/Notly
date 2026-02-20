import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-border bg-primary px-8 py-16 text-center md:px-16">
          <div className="relative z-10">
            <h2 className="text-balance text-3xl font-bold text-white/70 md:text-4xl">
              Empieza a organizar tu vida hoy
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
              Unete a miles de personas que ya usan Notly para ser mas
              productivos cada dia.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="bg-white/30 flex items-center justify-center rounded-full hover:bg-white/20 px-6 py-2 text-white transition-colors cursor-pointer"
              >
                Comenzar gratis
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
