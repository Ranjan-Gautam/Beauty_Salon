import PricingBanner from "@/components/pricing/PricingBanner";
import PriceMenu from "@/components/pricing/PriceMenu";
import MakeupService from "@/components/pricing/MakeupService";
import MakeupPackage from "@/components/pricing/MakeupPackage";
import Footer from "@/components/layout/Footer";

export default function PricingPage() {
  return (
    <>
      <PricingBanner />
      <PriceMenu />
      <MakeupService />
      <MakeupPackage />
      <Footer />
    </>
  );
}