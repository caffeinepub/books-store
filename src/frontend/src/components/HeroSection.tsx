import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section
      className="w-full min-h-[520px] sm:min-h-[600px] flex"
      style={{ backgroundColor: "oklch(var(--secondary))" }}
      data-ocid="hero.section"
    >
      {/* Left: text content */}
      <div className="flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-lg"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Welcome to Books &amp; More
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            Discover Your
            <br />
            <em
              className="not-italic"
              style={{ color: "oklch(var(--primary))" }}
            >
              Next Favourite
            </em>
            <br />
            Book
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
            Explore thousands of titles across fiction, non-fiction, and
            academic categories. Curated for curious minds.
          </p>
          <Button
            size="lg"
            className="rounded-xl px-8 py-3 font-semibold text-base shadow-soft"
            onClick={onShopNow}
            data-ocid="hero.primary_button"
          >
            Browse Books
          </Button>
        </motion.div>
      </div>

      {/* Right: lifestyle image */}
      <div className="hidden md:block w-[45%] lg:w-[50%] relative overflow-hidden">
        <img
          src="/assets/generated/hero-cozy-reading.dim_900x700.jpg"
          alt="Cozy reading nook with books"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-transparent" />
      </div>
    </section>
  );
}
