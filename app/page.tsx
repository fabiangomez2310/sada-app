import AdBanner from "../components/AdBanner";

export default function Home() {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <AdBanner />
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a SADA Calculadoras</h2>
        <p className="text-gray-600 mb-2">
          Calcula procesos de Cámara de Comercio: Constitución, Compraventa, Renovación, Matrícula y más.
        </p>
        <p className="text-gray-500 text-sm">
          Todos los cálculos se realizan en UVB y se muestran de forma clara y profesional.
        </p>
      </div>
    </div>
  );
}
