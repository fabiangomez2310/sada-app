"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-lg">SADA Calculadoras</h1>
        <div className="space-x-4">
          <Link href="/constitucion" className="hover:text-gray-200">Constitución</Link>
          <Link href="/compraventa" className="hover:text-gray-200">Compraventa</Link>
          <Link href="/renovacion" className="hover:text-gray-200">Renovación</Link>
        </div>
      </div>
    </nav>
  );
}
