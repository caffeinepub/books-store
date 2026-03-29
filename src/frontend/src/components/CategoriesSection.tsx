import { motion } from "motion/react";

interface CategoriesSectionProps {
  onCategoryClick: (cat: string) => void;
}

const CATEGORIES = [
  {
    key: "fiction",
    label: "Fiction",
    description: "Immerse yourself in captivating stories and imagined worlds.",
    emoji: "📖",
    bg: "oklch(var(--fiction-tint))",
  },
  {
    key: "nonFiction",
    label: "Non-Fiction",
    description: "Expand your knowledge with real stories and insights.",
    emoji: "🌍",
    bg: "oklch(var(--nonfiction-tint))",
  },
  {
    key: "academic",
    label: "Academic",
    description: "Textbooks and references for students and professionals.",
    emoji: "🎓",
    bg: "oklch(var(--academic-tint))",
  },
];

export function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Featured Collections
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">Browse by category</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            type="button"
            key={cat.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}
            onClick={() => onCategoryClick(cat.key)}
            className="rounded-2xl p-8 text-left cursor-pointer transition-all duration-200"
            style={{ background: cat.bg }}
            data-ocid={`categories.${cat.key}.button`}
          >
            <span className="text-4xl mb-4 block">{cat.emoji}</span>
            <h3 className="font-serif font-bold text-lg text-foreground mb-2">
              {cat.label}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {cat.description}
            </p>
            <span className="mt-4 inline-block text-xs font-semibold text-foreground/70 underline underline-offset-2">
              Explore →
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
