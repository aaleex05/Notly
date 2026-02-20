export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl px-6 py-8 text-center">
      <a
        href="https://alexaperador.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-white/60 transition-colors"
      >
        alexaperador.dev
      </a>
      <p className="text-sm text-muted-foreground mt-2">
        &copy; {new Date().getFullYear()} Notly. Todos los derechos reservados.
      </p>
    </footer>
  );
}
