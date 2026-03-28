"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../components/ui/sheet";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/gallery", label: "Galería" },
  { path: "/services", label: "Servicios" },
  { path: "/contact", label: "Contacto" },
];

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── NAV ─── */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-primary/5"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logop.png"
                alt="Printo-Material"
                className="h-9 w-auto transition-opacity group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="ml-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
              >
                Cotizar Ahora
              </Link>
            </div>

            {/* Mobile Menu — Shadcn Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-72">
                <div className="flex flex-col h-full pt-8">
                  <div className="mb-8">
                    <img
                      src="/logop.png"
                      alt="Printo-Material"
                      className="h-8 w-auto"
                    />
                  </div>
                  <nav className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <SheetClose asChild key={link.path}>
                          <Link
                            to={link.path}
                            className={cn(
                              "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/80 hover:bg-muted hover:text-foreground",
                            )}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                  <div className="mt-auto pb-4">
                    <SheetClose asChild>
                      <Link
                        to="/contact"
                        className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Cotizar Ahora
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ─── PAGE CONTENT ─── */}
      <main>
        <Outlet />
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="/logo.png"
                alt="Printo-Material"
                className="h-18 w-auto mb-3"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Laboratorio de impresión DTF de alta resolución en Santo
                Domingo, RD.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
                Navegación
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
                Contacto
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Santo Domingo, República Dominicana</li>
                <li>PrintoMatrial@gmail.com</li>
                <li>+1 (809) 716-7077</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Printo-Material. Todos los derechos
              reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              Arte · Santo Domingo · RD
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
