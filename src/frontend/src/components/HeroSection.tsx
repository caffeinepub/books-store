import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl overflow-hidden"
        style={{ backgroundColor: "oklch(0.91 0.033 55)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[380px]">
          <div className="px-8 sm:px-12 py-10 sm:py-14">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm font-medium text-primary uppercase tracking-widest mb-3"
            >
              New Collection 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-bold text-foreground leading-tight mb-4"
            >
              Discover Your
              <br />
              <span className="text-primary">Next Chapter</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm"
            >
              Explore thousands of books across every genre. From timeless
              classics to the latest bestsellers — your perfect read awaits.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                data-ocid="hero.primary_button"
                onClick={onShopNow}
                className="rounded-full px-7 py-5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-card"
              >
                Shop New Arrivals
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                variant="outline"
                className="rounded-full px-7 py-5 text-sm font-medium border-foreground/30 text-foreground hover:bg-foreground/5"
              >
                Browse Categories
              </Button>
            </motion.div>
          </div>
          <div className="relative flex items-end justify-center md:justify-end pr-0 md:pr-4 overflow-hidden h-[280px] md:h-full">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              src="/assets/generated/hero-illustration-transparent.dim_600x500.png"
              alt="Person reading"
              className="h-[280px] md:h-[400px] w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
