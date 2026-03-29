import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { getByCategory } from "../data/mockBooks";
import type { MockBook } from "../data/mockBooks";

interface FeaturedBooksSectionProps {
  activeCategory: string;
}

function BookTile({ book, index }: { book: MockBook; index: number }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="bg-card rounded-xl shadow-card overflow-hidden flex flex-col"
      data-ocid={`books.item.${index + 1}`}
    >
      <div className="p-3">
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-secondary/60">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            loading="lazy"
          />
        </div>
      </div>
      <div className="px-3 pb-4 flex flex-col flex-1">
        <p className="text-[11px] font-medium text-primary uppercase tracking-wide mb-1">
          {book.category === "nonFiction"
            ? "Non-Fiction"
            : book.category.charAt(0).toUpperCase() + book.category.slice(1)}
        </p>
        <h3 className="font-serif font-bold text-sm text-foreground leading-snug mb-0.5 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-muted-foreground">{book.rating}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-sm text-foreground">
            ${book.price.toFixed(2)}
          </span>
          <Button
            type="button"
            size="sm"
            className="text-xs px-2 py-1 h-7 rounded-lg"
            onClick={() => addToCart(book)}
            data-ocid={`books.button.${index + 1}`}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedBooksSection({
  activeCategory,
}: FeaturedBooksSectionProps) {
  const books = getByCategory(activeCategory).slice(0, 8);
  const title =
    activeCategory === "all"
      ? "Featured Books"
      : activeCategory === "nonFiction"
        ? "Non-Fiction Books"
        : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Books`;

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {title}
          </h2>
          {activeCategory === "all" && (
            <p className="text-muted-foreground mt-2 text-sm">
              Hand-picked selections for every reader
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {books.map((book, i) => (
            <BookTile key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
