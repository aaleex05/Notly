import Link from "next/link";

export default function NotFound() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-white/60 mb-6">La página que buscas no existe.</p>
      <Link
        href="/"
        className="bg-primary border-1 border-border text-white/80 hover:text-white px-5 py-3 hover:bg-[#1c1c1c] rounded-md font-medium transition-all cursor-pointer disabled:opacity-50 outline-none"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
