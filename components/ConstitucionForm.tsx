"use client";

import { useState } from "react";
import axios from "axios";

interface ConstitucionRequest {
  capitalSuscrito: number;
  capitalPagado: number;
  numeroAccionistas: number;
  matriculaEstablecimiento: boolean;
  aporteEstablecimiento: boolean;
}

interface ConstitucionResponse {
  capitalSuscrito: number;
  capitalPagado: number;
  numeroAccionistas: number;

  inscripcionDocumento: number;
  matriculaPersonaJuridica: number;
  formularioRues: number;
  matriculaEstablecimiento: number;
  aporteEstablecimiento: number;
  situacionControl: number;
  totalCamaraComercio: number;

  impuestoRegistroCuantia: number;
  impuestoRegistroSinCuantia: number;
  totalGobernacion: number;

  totalConstitucion: number;
}

export default function ConstitucionForm() {
  const [form, setForm] = useState<ConstitucionRequest>({
    capitalSuscrito: 0,
    capitalPagado: 0,
    numeroAccionistas: 1,
    matriculaEstablecimiento: false,
    aporteEstablecimiento: false,
  });

  const [result, setResult] = useState<ConstitucionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Formatear números con separadores de miles
  const formatNumberInput = (value: number) =>
    value.toLocaleString("es-CO", { maximumFractionDigits: 0 });

  // Convertir input de string con separadores a number
  const parseNumberInput = (value: string) =>
    Number(value.replace(/\./g, "") || 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    if (target.type === "checkbox") {
      const t = target as HTMLInputElement;
      setForm(prev => ({ ...prev, [t.name]: t.checked }));
    } else if (target.type === "number" || target.type === "text") {
      const t = target as HTMLInputElement;
      setForm(prev => ({ ...prev, [t.name]: parseNumberInput(t.value) }));
    } else if (target.type === "select-one") {
      const t = target as HTMLSelectElement;
      setForm(prev => ({ ...prev, [t.name]: Number(t.value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post<ConstitucionResponse>(
         "https://sada-api.onrender.com/api/constitucion/calcular",
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
      ? new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value)
      : "-";

  const handlePrint = () => {
    if (!result) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Resultado Constitución</title>
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
          <h2>Resultado Constitución</h2>

          <div class="section-title">Datos Base</div>
          <table>
            <tr><th>Capital Suscrito</th><td>${formatPeso(result.capitalSuscrito)}</td></tr>
            <tr><th>Capital Pagado</th><td>${formatPeso(result.capitalPagado)}</td></tr>
            <tr><th>Número de Accionistas</th><td>${result.numeroAccionistas}</td></tr>
          </table>

          <div class="section-title">Cámara de Comercio</div>
          <table>
            <tr><th>Inscripción Documento</th><td>${formatPeso(result.inscripcionDocumento)}</td></tr>
            <tr><th>Matrícula Persona Jurídica</th><td>${formatPeso(result.matriculaPersonaJuridica)}</td></tr>
            <tr><th>Formulario RUES</th><td>${formatPeso(result.formularioRues)}</td></tr>
            <tr><th>Matrícula Establecimiento</th><td>${formatPeso(result.matriculaEstablecimiento)}</td></tr>
            <tr><th>Aporte Establecimiento</th><td>${formatPeso(result.aporteEstablecimiento)}</td></tr>
            <tr><th>Situación Control</th><td>${formatPeso(result.situacionControl)}</td></tr>
            <tr><th>Total Cámara de Comercio</th><td>${formatPeso(result.totalCamaraComercio)}</td></tr>
          </table>

          <div class="section-title">Gobernación</div>
          <table>
            <tr><th>Impuesto Registro Cuantía</th><td>${formatPeso(result.impuestoRegistroCuantia)}</td></tr>
            <tr><th>Impuesto Registro sin Cuantía</th><td>${formatPeso(result.impuestoRegistroSinCuantia)}</td></tr>
            <tr><th>Total Gobernación</th><td>${formatPeso(result.totalGobernacion)}</td></tr>
          </table>

          <div class="section-title">Totales</div>
          <table>
            <tr><th>Total Constitución</th><td>${formatPeso(result.totalConstitucion)}</td></tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Constitución</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Capital Suscrito</label>
          <input
            type="text"
            name="capitalSuscrito"
            value={formatNumberInput(form.capitalSuscrito)}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Capital Pagado</label>
          <input
            type="text"
            name="capitalPagado"
            value={formatNumberInput(form.capitalPagado)}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Número de Accionistas</label>
          <select
            name="numeroAccionistas"
            value={form.numeroAccionistas}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1</option>
            <option value={2}>2 o más</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="matriculaEstablecimiento"
            checked={form.matriculaEstablecimiento}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-700">Matrícula Establecimiento</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="aporteEstablecimiento"
            checked={form.aporteEstablecimiento}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-700">Aporte Establecimiento</label>
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
            <p><strong>Inscripción Documento:</strong> {formatPeso(result.inscripcionDocumento)}</p>
            <p><strong>Matrícula Persona Jurídica:</strong> {formatPeso(result.matriculaPersonaJuridica)}</p>
            <p><strong>Formulario RUES:</strong> {formatPeso(result.formularioRues)}</p>
            <p><strong>Matrícula Establecimiento:</strong> {formatPeso(result.matriculaEstablecimiento)}</p>
            <p><strong>Aporte Establecimiento:</strong> {formatPeso(result.aporteEstablecimiento)}</p>
            <p><strong>Situación Control:</strong> {formatPeso(result.situacionControl)}</p>
            <p><strong>Total Cámara de Comercio:</strong> {formatPeso(result.totalCamaraComercio)}</p>
            <p><strong>Impuesto Registro Cuantía:</strong> {formatPeso(result.impuestoRegistroCuantia)}</p>
            <p><strong>Impuesto Registro sin Cuantía:</strong> {formatPeso(result.impuestoRegistroSinCuantia)}</p>
            <p><strong>Total Gobernación:</strong> {formatPeso(result.totalGobernacion)}</p>
            <p className="font-bold text-lg"><strong>Total Constitución:</strong> {formatPeso(result.totalConstitucion)}</p>
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
