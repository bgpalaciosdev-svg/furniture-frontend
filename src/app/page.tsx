import Hero from "@/components/Hero";
import CategorySlider from "@/components/CategorySlider";
import SaleSection from "@/components/SaleSection";
import MadeInUSA from "@/components/MadeInUSA";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategorySlider />

      <SaleSection />
      <FeaturedProducts />
      <MadeInUSA />
    </main>
  );
}
