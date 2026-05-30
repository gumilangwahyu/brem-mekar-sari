import { fetchProducts, fetchContents, DEFAULT_SETTINGS } from "@/lib/sheets";
import { getSiteSettings } from "@/lib/db";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import { CTASection, Footer } from "@/components/CTAFooter";
import FloatingWAButton from "@/components/FloatingWAButton";

export const revalidate = 300; // ISR - revalidate every 5 minutes

export default async function Home() {
  // Fetch data in parallel
  const [sheetsProducts, sheetsContents, settings] = await Promise.all([
    fetchProducts(),
    fetchContents(),
    Promise.resolve(getSiteSettings()),
  ]);

  // Use settings with defaults
  const siteSettings = { ...DEFAULT_SETTINGS, ...settings };

  // Products: use sheets data (admin can override via API)
  const products = sheetsProducts.length > 0 ? sheetsProducts : [];
  const contents = sheetsContents.length > 0 ? sheetsContents : [];

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection settings={siteSettings} />
      <StatsSection />
      <AboutSection settings={siteSettings} />
      <ProductsSection
        products={products}
        waNumber={siteSettings.waNumber}
      />
      <GallerySection contents={contents} />
      <CTASection settings={siteSettings} />
      <Footer settings={siteSettings} />
      <FloatingWAButton
        waNumber={siteSettings.waNumber}
        message={siteSettings.waMessage}
      />
    </main>
  );
}
