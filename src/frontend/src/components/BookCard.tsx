import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import type { SampleBook } from "../data/books";
import { useCartStore } from "../store/cartStore";

interface BookCardProps {
  book: SampleBook;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "fill-gold text-gold" : "fill-muted text-muted-foreground"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function BookCard({ book, index }: BookCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const handleAddToCart = () => {
    addItem(book);
    toast.success(`"${book.title}" added to cart`, {
      description: `$${book.price.toFixed(2)}`,
    });
  };
  return (
    <div
      data-ocid={`books.item.${index}`}
      className="group bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {book.isNewRelease && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
            New
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-foreground text-sm leading-snug mb-0.5 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
        <StarRating rating={book.rating} />
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="font-semibold text-foreground">
            ${book.price.toFixed(2)}
          </span>
          <Button
            data-ocid={`books.item.${index}.button`}
            size="sm"
            onClick={handleAddToCart}
            className="rounded-full text-xs px-3 h-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
