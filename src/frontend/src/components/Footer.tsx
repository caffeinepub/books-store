import { BookOpen } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full mt-auto"
      style={{
        background:
          "linear-gradient(135deg, oklch(var(--footer-start)) 0%, oklch(var(--footer-end)) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-foreground/70" />
              <span className="font-serif font-bold text-lg text-foreground">
                Books &amp; Store
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your curated online bookstore. Discover your next great read.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                aria-label="X/Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Discover
            </h4>
            <ul className="flex flex-col gap-2">
              {["Fiction", "Non-Fiction", "Academic", "New Arrivals"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {["About Us", "Careers", "Press", "Blog"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Support
            </h4>
            <ul className="flex flex-col gap-2">
              {["FAQ", "Shipping", "Returns", "Contact Us"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {year}. Built with <span aria-label="love">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
}
