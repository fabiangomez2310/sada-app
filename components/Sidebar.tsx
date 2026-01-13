"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">SADA</h1>
      <nav className="flex flex-col space-y-2">
        <Link href="/constitucion" className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">Constitución</Link>
        <Link href="/compraventa" className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">Compraventa</Link>
        <Link href="/renovacion" className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">Renovación</Link>
      </nav>
      <div className="mt-auto text-gray-400 text-sm">
        © 2026 SADA
      </div>
    </aside>
  );
}
