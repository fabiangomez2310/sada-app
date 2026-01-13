// app/layout.tsx
import Header from "@/components/Header"; // ajusta la ruta según tu proyecto
import "./globals.css";

export const metadata = {
  title: "SADA Calculadoras",
  description: "Calculadoras para trámites de Cámara de Comercio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen">
        {/* Header fijo en la parte superior */}
        <Header />

        {/* Contenido principal */}
        <main className="max-w-7xl mx-auto p-4 mt-4">
          {children}
        </main>

        {/* Footer opcional */}
        <footer className="mt-12 p-4 text-center text-gray-500 text-sm">
          © 2026 SADA. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
