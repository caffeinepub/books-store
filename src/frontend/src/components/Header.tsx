import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

interface HeaderProps {
  onSearch: (query: string) => void;
  activeSection: string;
  onNavClick: (section: string) => void;
}

export function Header({ onSearch, activeSection, onNavClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const itemCount = totalItems();

  const navLinks = [
    { id: "fiction", label: "Fiction" },
    { id: "nonFiction", label: "Non-Fiction" },
    { id: "academic", label: "Academic" },
    { id: "featured", label: "Best Sellers" },
    { id: "contact", label: "Contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          <div className="flex items-center gap-2 flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground whitespace-nowrap">
              Books &amp; Store
            </span>
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-auto hidden sm:flex items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="header.search_input"
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border rounded-full text-sm"
              />
            </div>
          </form>
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex w-9 h-9 rounded-full"
              aria-label="Account"
            >
              <User className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex w-9 h-9 rounded-full"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              data-ocid="header.open_modal_button"
              variant="ghost"
              size="icon"
              className="relative w-9 h-9 rounded-full"
              onClick={toggleCart}
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
                  {itemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden w-9 h-9 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 pb-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              data-ocid={`nav.${link.id}.link`}
              onClick={() => onNavClick(link.id)}
              className={`text-sm font-medium transition-colors pb-1 border-b-2 ${activeSection === link.id ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden bg-secondary border-t border-border"
          >
            <div className="px-4 py-3 space-y-1">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center mb-3"
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border rounded-full text-sm"
                  />
                </div>
              </form>
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    onNavClick(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-accent"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
