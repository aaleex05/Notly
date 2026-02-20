import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notly - Tu aplicación de notas y tareas",
  description: "Organiza tus ideas y tareas con Notly, la aplicación de notas y tareas fácil de usar y eficiente.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"
      suppressHydrationWarning={true}
      data-lt-installed="true"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" richColors duration={3000} />
        {children}
      </body>
    </html>
  );
}

