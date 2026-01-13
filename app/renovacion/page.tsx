import RenovacionForm from "@/components/RenovacionForm";
import AdBanner from "@/components/AdBanner";

export default function RenovacionPage() {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <AdBanner />
      <RenovacionForm />
    </div>
  );
}
