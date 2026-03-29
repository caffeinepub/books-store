import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { getNewArrivals } from "../data/mockBooks";
import type { MockBook } from "../data/mockBooks";

function BookCover({ book }: { book: MockBook }) {
  return (
    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-secondary/60 flex items-center justify-center">
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
  );
}

export function NewArrivalsSection() {
  const { addToCart } = useCart();
  const books = getNewArrivals().slice(0, 4);

  return (
    <section
      className="py-16"
      style={{ backgroundColor: "oklch(var(--arrivals-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            New Arrivals
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Fresh titles just landed
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-card rounded-xl shadow-card overflow-hidden flex flex-col"
              data-ocid={`arrivals.item.${i + 1}`}
            >
              <div className="p-3">
                <BookCover book={book} />
              </div>
              <div className="px-3 pb-4 flex flex-col flex-1">
                <p className="text-[11px] font-medium text-primary uppercase tracking-wide mb-1">
                  {book.category === "nonFiction"
                    ? "Non-Fiction"
                    : book.category.charAt(0).toUpperCase() +
                      book.category.slice(1)}
                </p>
                <h3 className="font-serif font-bold text-sm text-foreground leading-snug mb-0.5 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {book.author}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    {book.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-semibold text-sm text-foreground">
                    ${book.price.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    className="text-xs px-2 py-1 h-7 rounded-lg"
                    onClick={() => addToCart(book)}
                    data-ocid={`arrivals.button.${i + 1}`}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
