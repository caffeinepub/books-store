import { ArrowRight, BookOpen, GraduationCap, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

interface CategoriesSectionProps {
  onCategoryClick: (cat: string) => void;
}

export function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  const categories = [
    {
      id: "fiction",
      title: "Fiction",
      description:
        "Lose yourself in gripping stories, unforgettable characters, and worlds beyond imagination.",
      icon: BookOpen,
      accent: "oklch(0.57 0.065 235)",
      accentLight: "oklch(0.88 0.04 235)",
      count: "2,400+ titles",
    },
    {
      id: "nonFiction",
      title: "Non-Fiction",
      description:
        "Expand your mind with biographies, history, science, business, and self-improvement books.",
      icon: Lightbulb,
      accent: "oklch(0.67 0.055 145)",
      accentLight: "oklch(0.90 0.04 145)",
      count: "1,800+ titles",
    },
    {
      id: "academic",
      title: "Academic",
      description:
        "Comprehensive textbooks and scholarly works across engineering, medicine, law, and more.",
      icon: GraduationCap,
      accent: "oklch(0.62 0.045 65)",
      accentLight: "oklch(0.91 0.03 65)",
      count: "950+ titles",
    },
  ];

  return (
    <section
      id="categories"
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Book Categories
        </h2>
        <p className="text-muted-foreground">
          Find your perfect genre and start exploring
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-2xl overflow-hidden bg-muted shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
            onClick={() => onCategoryClick(cat.id)}
          >
            <div
              className="h-24 flex items-center justify-center"
              style={{ backgroundColor: cat.accentLight }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: cat.accent }}
              >
                <cat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {cat.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {cat.count}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {cat.description}
              </p>
              <button
                type="button"
                data-ocid={`categories.${cat.id}.link`}
                className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all"
              >
                Browse {cat.title} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
