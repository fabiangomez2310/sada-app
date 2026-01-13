// app/compraventa/page.tsx
import CompraventaForm from "@/components/CompraventaForm";
import AdBanner from "@/components/AdBanner";

export default function CompraventaPage() {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <AdBanner />
      <CompraventaForm />
    </div>
  );
}
