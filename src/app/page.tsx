import Hero from "@/components/layout/Hero";
import SkincareIntro from "@/components/layout/IntroSection";
import Services from "@/components/layout/Services";
import ProductsServices from "@/components/layout/ProductsSection";
import Facial from "@/components/layout/Facial";
import Team from "@/components/layout/Team";
import Testimionials from "@/components/layout/Testimonials";
import Pricing from "@/components/layout/Pricing";
import Blog from "@/components/layout/Blog";
import Partners from "@/components/layout/Partners";
import Newsletter from "@/components/layout/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkincareIntro />
      <Services />
      <ProductsServices />
      <Facial />
      
      <Team/>
      <Testimionials />
      <Pricing />
      <Blog />
      <Partners />
      <Newsletter />  
    </main>
  );
}
