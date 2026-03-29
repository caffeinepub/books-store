import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "motion/react";

const REVIEWS = [
  {
    name: "Sarah Mitchell",
    initials: "SM",
    quote:
      "Books & Store completely transformed my reading habits. The curated selections are spot-on, and delivery is always fast. I've discovered so many incredible authors I never would have found otherwise!",
    rating: 5,
    label: "Avid Reader",
  },
  {
    name: "James Okafor",
    initials: "JO",
    quote:
      "As a university student, the academic section is a lifesaver. Textbooks arrive quickly and the prices are very fair. The search function makes it so easy to find exactly what I need for my courses.",
    rating: 5,
    label: "University Student",
  },
];

export function ReviewsSection() {
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
          What Readers Say
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Loved by thousands of book lovers
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl shadow-card p-8 flex flex-col gap-4"
            data-ocid={`reviews.item.${i + 1}`}
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }, (_, j) => (
                <Star
                  key={`star-${review.name}-${j}`}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              &ldquo;{review.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <Avatar className="w-10 h-10">
                <AvatarFallback
                  className="text-xs font-semibold"
                  style={{ backgroundColor: "oklch(var(--fiction-tint))" }}
                >
                  {review.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">{review.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
