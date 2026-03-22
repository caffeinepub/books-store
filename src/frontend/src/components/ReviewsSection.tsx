import { Star } from "lucide-react";
import { motion } from "motion/react";

const reviews = [
  {
    id: 1,
    name: "Sarah Thompson",
    initials: "ST",
    rating: 5,
    text: "Books & Store has completely transformed my reading life. The selection is incredible and delivery is always lightning fast. I've discovered so many amazing authors I never would have found otherwise!",
    location: "New York, USA",
    avatarColor: "oklch(0.75 0.08 30)",
  },
  {
    id: 2,
    name: "James Whitfield",
    initials: "JW",
    rating: 5,
    text: "As an academic, I rely on Books & Store for textbooks and research materials. Their academic section is unmatched — always up to date and competitively priced. Highly recommended!",
    location: "London, UK",
    avatarColor: "oklch(0.65 0.07 235)",
  },
  {
    id: 3,
    name: "Priya Nair",
    initials: "PN",
    rating: 5,
    text: "The website is so elegant and easy to navigate. Found exactly what I was looking for within minutes. The personalized recommendations are spot-on. This is my go-to bookstore now!",
    location: "Mumbai, India",
    avatarColor: "oklch(0.70 0.06 145)",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? "fill-gold text-gold" : "fill-muted text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-12 sm:py-16"
      style={{ backgroundColor: "oklch(0.928 0.022 80)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
            What Our Readers Say
          </h2>
          <p className="text-muted-foreground">
            Trusted by over 50,000 book lovers worldwide
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              data-ocid={`reviews.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-6 shadow-card"
            >
              <StarRow rating={review.rating} />
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                “{review.text}”
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                  style={{ backgroundColor: review.avatarColor }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
