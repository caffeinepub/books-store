import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onSearch: (query: string) => void;
  activeSection: string;
  onNavClick: (section: string) => void;
}

const NAV_LINKS = [
  { label: "Home", key: "home" },
  { label: "Fiction", key: "fiction" },
  { label: "Non-Fiction", key: "nonFiction" },
  { label: "Academic", key: "academic" },
  { label: "Contact", key: "contact" },
];

export function Header({ onSearch, activeSection, onNavClick }: HeaderProps) {
  const { totalItems, openCart } = useCart();
  const [searchVal, setSearchVal] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      {/* Row 1: Logo + Search + Cart */}
      <div className="border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onNavClick("home")}
            className="shrink-0 flex items-center"
            data-ocid="header.link"
            aria-label="Books & More home"
          >
            <img
              src="/assets/uploads/img-20260322-wa0000-019d3868-4eef-71e7-bb32-8ae0e9aeec8d-1.jpg"
              alt="Books & More"
              className="h-10 w-auto object-contain"
            />
            <span
              className="ml-3 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-500 bg-clip-text text-transparent font-bold tracking-wide"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1.25rem",
                letterSpacing: "0.04em",
              }}
            >
              Books &amp; More
            </span>
          </button>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md mx-auto hidden sm:flex items-center relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search for books…"
              className="pl-9 rounded-full bg-secondary/60 border-border/40 text-sm"
              data-ocid="header.search_input"
            />
          </form>

          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            {/* Cart */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
              aria-label="Open cart"
              data-ocid="header.button"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Row 2: Nav links (desktop) */}
      <div
        className="border-b border-border/40 hidden sm:block"
        style={{ backgroundColor: "oklch(var(--secondary))" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.key}
                onClick={() => onNavClick(link.key)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeSection === link.key
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`nav.${link.key}.link`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Account"
            data-ocid="header.toggle"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="sm:hidden border-b border-border/40 bg-secondary/80 px-4 py-3 flex flex-col gap-1">
          <form
            onSubmit={handleSearch}
            className="flex items-center relative mb-2"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search for books…"
              className="pl-9 rounded-full bg-background/60 border-border/40 text-sm"
            />
          </form>
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.key}
              onClick={() => {
                onNavClick(link.key);
                setMobileOpen(false);
              }}
              className="text-sm text-left px-2 py-2 rounded-md hover:bg-background/60 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
