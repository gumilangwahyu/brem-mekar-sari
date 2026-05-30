import { fetchProducts, fetchContents, DEFAULT_SETTINGS } from "@/lib/sheets";
import { getSiteSettings, readSiteData } from "@/lib/db";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import { CTASection, Footer } from "@/components/CTAFooter";
import FloatingWAButton from "@/components/FloatingWAButton";

export const revalidate = 0; // Disable server cache for real-time changes

export default async function Home() {
  // Fetch data in parallel
  const [sheetsProducts, sheetsContents, settings] = await Promise.all([
    fetchProducts(),
    fetchContents(),
    Promise.resolve(getSiteSettings()),
  ]);

  const localData = readSiteData();

  // Use settings with defaults
  const siteSettings = { ...DEFAULT_SETTINGS, ...settings };

  // Products: use local overrides if enabled, otherwise use Google Sheets
  const products = localData.overrideProducts && localData.products && localData.products.length > 0
    ? localData.products
    : (sheetsProducts.length > 0 ? sheetsProducts : []);

  // Contents: use local overrides if enabled, otherwise use Google Sheets
  const contents = localData.overrideContents && localData.contents && localData.contents.length > 0
    ? localData.contents
    : (sheetsContents.length > 0 ? sheetsContents : []);

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
