import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { CategoriesSection } from "./components/CategoriesSection";
import { ContactSection } from "./components/ContactSection";
import { FeaturedBooksSection } from "./components/FeaturedBooksSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ReviewsSection } from "./components/ReviewsSection";

const queryClient = new QueryClient();

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    if (["fiction", "nonFiction", "academic"].includes(section)) {
      setActiveCategory(section);
      scrollTo(featuredRef);
    } else if (section === "featured") {
      setActiveCategory("all");
      scrollTo(featuredRef);
    } else if (section === "contact") {
      scrollTo(contactRef);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setActiveSection(cat);
    scrollTo(featuredRef);
  };

  const handleSearch = (query: string) => {
    if (query) scrollTo(featuredRef);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={handleSearch}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      <main className="flex-1">
        <HeroSection onShopNow={() => scrollTo(featuredRef)} />
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        <div ref={featuredRef}>
          <FeaturedBooksSection activeCategory={activeCategory} />
        </div>
        <ReviewsSection />
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
