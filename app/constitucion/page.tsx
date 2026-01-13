import ConstitucionForm from "../../components/ConstitucionForm";
import AdBanner from "../../components/AdBanner";

export default function ConstitucionPage() {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <AdBanner />
      <ConstitucionForm />
    </div>
  );
}
