"use client";

import { useState } from "react";
import axios from "axios";

interface RenovacionRequest {
  activos: number;
  establecimientosMismaJurisdiccion: number;
  establecimientosOtraJurisdiccion: number;
  tipoPersona: string;
}

interface RenovacionResponse {
  activos: number;
  tipoPersona: string;

  renovacionPropietario: number;
  establecimientosMisma: number;
  establecimientosDiferente: number;

  renovacionEstablecimientosMisma: number;
  renovacionEstablecimientosDiferente: number;

  formularioRues: number;
  certificado: number;

  totalRenovacion: number;
  totalPagar: number;

  porcentajeSobreActivos: number;
}

export default function RenovacionForm() {
  const [form, setForm] = useState<RenovacionRequest>({
    activos: 0,
    establecimientosMismaJurisdiccion: 1,
    establecimientosOtraJurisdiccion: 0,
    tipoPersona: "PN",
  });

  const [result, setResult] = useState<RenovacionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;

    if (type === "number" || type === "text") {
      // Quitar puntos y convertir a número
      const rawValue = (e.target as HTMLInputElement).value.replace(/\./g, "");
      setForm((prev) => ({
        ...prev,
        [name]: Number(rawValue) || 0,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLSelectElement).value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post<RenovacionResponse>(
        "https://sada-api.onrender.com/api/renovacion/calcular",
        form
      );
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError("Ocurrió un error al calcular. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const formatPeso = (value: number | undefined) =>
    value != null
      ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value)
      : "-";

  const formatInput = (value: number) =>
    value.toLocaleString("es-CO");

  const handlePrint = () => {
    if (!result) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Resultado Renovación</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #111; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #eee; }
            .section-title { margin-top: 20px; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Resultado Renovación</h2>

          <div class="section-title">Datos Generales</div>
          <table>
            <tr><th>Activos</th><td>${formatPeso(result.activos)}</td></tr>
            <tr><th>Tipo de Persona</th><td>${result.tipoPersona}</td></tr>
          </table>

          <div class="section-title">Cámara de Comercio</div>
          <table>
            <tr><th>Renovación Propietario</th><td>${formatPeso(result.renovacionPropietario)}</td></tr>
            <tr><th>Establecimientos Misma Jurisdicción</th><td>${formatPeso(result.renovacionEstablecimientosMisma)}</td></tr>
            <tr><th>Establecimientos Otra Jurisdicción</th><td>${formatPeso(result.renovacionEstablecimientosDiferente)}</td></tr>
            <tr><th>Formulario RUES</th><td>${formatPeso(result.formularioRues)}</td></tr>
            <tr><th>Certificado</th><td>${formatPeso(result.certificado)}</td></tr>
            <tr><th>Total Renovación</th><td>${formatPeso(result.totalRenovacion)}</td></tr>
          </table>

          <div class="section-title">Totales</div>
          <table>
            <tr><th>Total a Pagar</th><td>${formatPeso(result.totalPagar)}</td></tr>
            <tr><th>Porcentaje sobre Activos</th><td>${result.porcentajeSobreActivos}%</td></tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Renovación</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Activos del propietario</label>
          <input
            type="text"
            name="activos"
            value={formatInput(form.activos)}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tipo de Persona</label>
          <select
            name="tipoPersona"
            value={form.tipoPersona}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PN">Natural</option>
            <option value="PJ">Jurídica</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Establecimientos Misma Jurisdicción</label>
          <input
            type="text"
            name="establecimientosMismaJurisdiccion"
            value={formatInput(form.establecimientosMismaJurisdiccion)}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Establecimientos Otra Jurisdicción</label>
          <input
            type="text"
            name="establecimientosOtraJurisdiccion"
            value={formatInput(form.establecimientosOtraJurisdiccion)}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="bg-gray-50 p-4 rounded shadow-inner space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">Resultado</h3>
            <p><strong>Cámara de Comercio:</strong></p>
            <p>- Renovación Propietario: {formatPeso(result.renovacionPropietario)}</p>
            <p>- Establecimientos Misma Jurisdicción: {formatPeso(result.renovacionEstablecimientosMisma)}</p>
            <p>- Establecimientos Otra Jurisdicción: {formatPeso(result.renovacionEstablecimientosDiferente)}</p>
            <p>- Formulario RUES: {formatPeso(result.formularioRues)}</p>
            <p>- Certificado: {formatPeso(result.certificado)}</p>
            <p><strong>Total Renovación:</strong> {formatPeso(result.totalRenovacion)}</p>
            <p><strong>Total a Pagar:</strong> {formatPeso(result.totalPagar)}</p>
            <p><strong>Porcentaje sobre Activos:</strong> {result.porcentajeSobreActivos}%</p>
          </div>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={handlePrint}
          >
            Imprimir Resultado
          </button>
        </div>
      )}
    </div>
  );
}
