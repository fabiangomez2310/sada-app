"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const pageTitles: Record<string, string> = {
    "/": "Inicio",
    "/constitucion": "Calculadora de Constitución",
    "/compraventa": "Calculadora de Compraventa",
    "/renovacion": "Calculadora de Renovación",
  };

  const title = pageTitles[pathname] || "SADA Calculadoras";

  const links = [
    { href: "/constitucion", label: "Constitución" },
    { href: "/compraventa", label: "Compraventa" },
    { href: "/renovacion", label: "Renovación" },
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:px-6">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            SADA
          </Link>
          <span className="hidden md:inline text-gray-600 text-sm">{title}</span>
        </div>

        {/* Menú Desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                pathname === link.href ? "font-semibold text-blue-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.paypal.com/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Donar
          </a>
        </nav>

        {/* Botón Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none text-2xl"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <nav className="md:hidden mt-2 bg-white border-t border-gray-200 shadow-inner rounded-b">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition ${
                pathname === link.href ? "font-semibold bg-gray-100" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.paypal.com/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 mt-1 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Donar
          </a>
        </nav>
      )}
    </header>
  );
}
