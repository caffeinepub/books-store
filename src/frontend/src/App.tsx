import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { CategoriesSection } from "./components/CategoriesSection";
import { CheckoutPage } from "./components/CheckoutPage";
import { ContactSection } from "./components/ContactSection";
import { FeaturedBooksSection } from "./components/FeaturedBooksSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { NewArrivalsSection } from "./components/NewArrivalsSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/CartContext";

const queryClient = new QueryClient();

type Page = "home" | "checkout";

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const { closeCart } = useCart();

  const featuredRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (section: string) => {
    setPage("home");
    setActiveSection(section);
    if (["fiction", "nonFiction", "academic"].includes(section)) {
      setActiveCategory(section);
      scrollTo(featuredRef);
    } else if (section === "home" || section === "featured") {
      setActiveCategory("all");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "contact") {
      scrollTo(contactRef);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setPage("home");
    setActiveCategory(cat);
    setActiveSection(cat);
    scrollTo(featuredRef);
  };

  const handleSearch = (query: string) => {
    if (query) {
      setPage("home");
      setActiveCategory("all");
      scrollTo(featuredRef);
    }
  };

  if (page === "checkout") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          onSearch={handleSearch}
          activeSection=""
          onNavClick={handleNavClick}
        />
        <main className="flex-1">
          <CheckoutPage
            onBack={() => setPage("home")}
            onContinueShopping={() => setPage("home")}
          />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    );
  }

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
        <NewArrivalsSection />
        <div ref={featuredRef}>
          <FeaturedBooksSection activeCategory={activeCategory} />
        </div>
        <ReviewsSection />
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      <Footer />
      <CartDrawer
        onCheckout={() => {
          closeCart();
          setPage("checkout");
        }}
      />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </QueryClientProvider>
  );
}
