import { motion } from "motion/react";
import { sampleBooks } from "../data/books";
import { BookCard } from "./BookCard";

interface FeaturedBooksSectionProps {
  activeCategory: string;
}

export function FeaturedBooksSection({
  activeCategory,
}: FeaturedBooksSectionProps) {
  const featured = sampleBooks.filter((b) => b.isFeatured);
  const newReleases = sampleBooks.filter((b) => b.isNewRelease);
  const filteredFeatured =
    activeCategory === "all"
      ? featured
      : featured.filter((b) => b.category === activeCategory);
  const filteredNew =
    activeCategory === "all"
      ? newReleases
      : newReleases.filter((b) => b.category === activeCategory);

  return (
    <section
      id="featured"
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-1">
              Featured Books
            </h2>
            <p className="text-muted-foreground text-sm">
              Hand-picked selections from our editors
            </p>
          </div>
        </div>
        {filteredFeatured.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredFeatured.map((book, i) => (
              <BookCard key={book.id} book={book} index={i + 1} />
            ))}
          </div>
        ) : (
          <div
            data-ocid="books.empty_state"
            className="text-center py-12 text-muted-foreground bg-card rounded-2xl"
          >
            No featured books in this category yet.
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-14"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-1">
              New Releases
            </h2>
            <p className="text-muted-foreground text-sm">
              The latest arrivals in our collection
            </p>
          </div>
        </div>
        {filteredNew.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredNew.map((book, i) => (
              <BookCard key={book.id} book={book} index={i + 1} />
            ))}
          </div>
        ) : (
          <div
            data-ocid="new_releases.empty_state"
            className="text-center py-12 text-muted-foreground bg-card rounded-2xl"
          >
            No new releases in this category yet.
          </div>
        )}
      </motion.div>
    </section>
  );
}
