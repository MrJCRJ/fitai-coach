import { RewardedAd } from "@/components/RewardedAd";

// Test component to verify RewardedAd works
export default function TestRewardedAd() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste do RewardedAd</h1>
      <RewardedAd
        onAdComplete={() => console.log("Anúncio completado!")}
        onAdError={(error) => console.error("Erro no anúncio:", error)}
      />
    </div>
  );
}