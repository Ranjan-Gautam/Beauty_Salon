import Hero from "@/components/layout/Hero";
import SkincareIntro from "@/components/layout/IntroSection";
import Services from "@/components/layout/Services";
import ProductsServices from "@/components/layout/ProductsSection";
import Facial from "@/components/layout/Facial";
export default function Home() {
  return (
    <main>
      <Hero />
      <SkincareIntro />
      <Services />
      <ProductsServices />
      <Facial />
    </main>
  );
}
