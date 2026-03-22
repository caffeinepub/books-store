import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const socialLinks = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
];

const exploreLinks = [
  "Fiction",
  "Non-Fiction",
  "Academic",
  "Best Sellers",
  "New Releases",
  "Award Winners",
];
const helpLinks = [
  "Track Order",
  "Shipping Policy",
  "Return Policy",
  "FAQ",
  "Contact Us",
  "Store Locations",
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed!", {
        description: "You're now on our reading list.",
      });
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer style={{ backgroundColor: "oklch(0.928 0.022 80)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg font-bold text-foreground">
                Books &amp; Store
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Your premier destination for books of every genre. Curated
              collections, expert recommendations, and a love for great
              literature.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {exploreLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="hover:text-foreground transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              Help
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {helpLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="hover:text-foreground transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get weekly reading recommendations and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                data-ocid="footer.input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border rounded-full text-sm"
              />
              <Button
                data-ocid="footer.submit_button"
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Books &amp; Store. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
