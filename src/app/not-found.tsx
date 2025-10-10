import Link from "next/link";

export default function NotFound() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
      <Link 
        href="/" 
        className="hover:bg-blue-800 bg-blue-600 py-2 px-5 rounded-full text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
