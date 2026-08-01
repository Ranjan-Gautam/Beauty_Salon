import Hero from "@/components/layout/Hero";
import SkincareIntro from "@/components/layout/IntroSection";
import Services from "@/components/layout/Services";
import Facial from "@/components/layout/Facial";
import Testimionials from "@/components/layout/Testimonials";
import Pricing from "@/components/layout/Pricing";
import Blog from "@/components/layout/Blog";
import Partners from "@/components/layout/Partners";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkincareIntro />
      <Services />
      <Facial />

      <Testimionials />
      <Pricing />
      <Blog />
      <Partners />
      <Footer />
    </main>
  );
}
