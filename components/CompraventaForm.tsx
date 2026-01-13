"use client";

import { useState } from "react";
import axios from "axios";

interface CompraventaRequest {
  valorVentaEstablecimiento: number;
  matricularComprador: boolean;
}

interface CompraventaResponse {
  valorVentaEstablecimiento: number;
  matricularComprador: boolean;
  impuestoRegistro: number;      // Gobernación
  retencionDian: number;         // DIAN
  ingresoDocumento: number;      // Cámara de Comercio
  matriculaComprador: number;    // Cámara de Comercio
  totalCamaraComercio: number;   // Cámara de Comercio
  totalCompraventa: number;      // Total general
}

export default function CompraventaForm() {
  const [form, setForm] = useState<CompraventaRequest>({
    valorVentaEstablecimiento: 0,
    matricularComprador: false,
  });

  const [result, setResult] = useState<CompraventaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manejo de cambio de input y select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;

    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : Number(e.target.value);

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post<CompraventaResponse>(
        "https://sada-api.onrender.com/api/compraventa/calcular",
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

  // Formateo en pesos
  const formatPeso = (value: number | undefined) =>
    value != null
      ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value)
      : "-";

  // Función para imprimir resultado
  const handlePrint = () => {
    if (!result) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Resultado Compraventa</title>
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
          <h2>Resultado Compraventa</h2>

          <div class="section-title">Datos Generales</div>
          <table>
            <tr><th>Valor Venta Establecimiento</th><td>${formatPeso(result.valorVentaEstablecimiento)}</td></tr>
            <tr><th>Matricular Comprador</th><td>${result.matricularComprador ? "Sí" : "No"}</td></tr>
          </table>

          <div class="section-title">Gobernación</div>
          <table>
            <tr><th>Impuesto Registro</th><td>${formatPeso(result.impuestoRegistro)}</td></tr>
          </table>

          <div class="section-title">DIAN</div>
          <table>
            <tr><th>Retención en la Fuente</th><td>${formatPeso(result.retencionDian)}</td></tr>
          </table>

          <div class="section-title">Cámara de Comercio</div>
          <table>
            <tr><th>Ingreso Documento</th><td>${formatPeso(result.ingresoDocumento)}</td></tr>
            <tr><th>Matrícula Comprador</th><td>${formatPeso(result.matriculaComprador)}</td></tr>
            <tr><th>Total Cámara de Comercio</th><td>${formatPeso(result.totalCamaraComercio)}</td></tr>
          </table>

          <div class="section-title">Totales</div>
          <table>
            <tr><th>Total Compraventa</th><td>${formatPeso(result.totalCompraventa)}</td></tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  // Para mostrar miles con puntos en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\./g, ""); // Quitamos puntos existentes
    if (!isNaN(Number(value))) {
      const formatted = Number(value).toLocaleString("es-CO");
      e.target.value = formatted;
      setForm((prev) => ({
        ...prev,
        valorVentaEstablecimiento: Number(value),
      }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Compraventa</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Valor Venta Establecimiento</label>
          <input
            type="text"
            name="valorVentaEstablecimiento"
            value={form.valorVentaEstablecimiento.toLocaleString("es-CO")}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el valor"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="matricularComprador"
            checked={form.matricularComprador}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-700">Matricular Comprador</label>
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

            <p className="font-medium mt-2">Gobernación</p>
            <p><strong>Impuesto Registro:</strong> {formatPeso(result.impuestoRegistro)}</p>

            <p className="font-medium mt-2">DIAN</p>
            <p><strong>Retención en la Fuente:</strong> {formatPeso(result.retencionDian)}</p>

            <p className="font-medium mt-2">Cámara de Comercio</p>
            <p><strong>Ingreso Documento:</strong> {formatPeso(result.ingresoDocumento)}</p>
            <p><strong>Matrícula Comprador:</strong> {formatPeso(result.matriculaComprador)}</p>
            <p><strong>Total Cámara de Comercio:</strong> {formatPeso(result.totalCamaraComercio)}</p>

            <p className="font-bold text-lg mt-2"><strong>Total Compraventa:</strong> {formatPeso(result.totalCompraventa)}</p>
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
