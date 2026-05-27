"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isTransparent
            ? "bg-transparent"
            : "bg-[var(--color-cream)] border-b border-[var(--color-whisper)]"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo.png"
                alt="Livelihood Lab Africa"
                width={160}
                height={52}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative text-sm tracking-wide transition-colors duration-200",
                      isActive
                        ? isTransparent
                          ? "text-[var(--color-cream)]"
                          : "text-[var(--color-amber)]"
                        : isTransparent
                        ? "text-[var(--color-mist)] hover:text-[var(--color-cream)]"
                        : "text-[var(--color-smoke)] hover:text-[var(--color-charcoal)]"
                    )}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-amber)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "lg:hidden flex flex-col gap-1.5 p-2 transition-colors",
                isTransparent
                  ? "text-[var(--color-cream)]"
                  : "text-[var(--color-charcoal)]"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={cn(
                  "block w-6 h-px transition-all duration-300 bg-current origin-center",
                  menuOpen && "rotate-45 translate-y-[7px]"
                )}
              />
              <span
                className={cn(
                  "block w-4 h-px transition-all duration-300 bg-current",
                  menuOpen && "opacity-0 w-6"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-px transition-all duration-300 bg-current origin-center",
                  menuOpen && "-rotate-45 -translate-y-[7px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-forest)] lg:hidden"
          >
            <div className="flex flex-col justify-center h-full px-8 pt-20">
              {/* Logo in mobile overlay */}
              <div className="absolute top-5 left-6">
                <Image
                  src="/logo.png"
                  alt="Livelihood Lab Africa"
                  width={140}
                  height={46}
                  className="h-9 w-auto object-contain"
                />
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        "font-serif text-4xl text-[var(--color-cream)] hover:text-[var(--color-amber)] transition-colors duration-200",
                        pathname === href && "text-[var(--color-amber)]"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-16 pt-8 border-t border-[var(--color-earth)]"
              >
                <p className="text-[var(--color-sage-light)] text-xs tracking-widest uppercase mb-2">
                  Get in touch
                </p>
                <a
                  href="mailto:llabafrica009@gmail.com"
                  className="text-[var(--color-mist)] text-sm hover:text-[var(--color-amber)] transition-colors"
                >
                  llabafrica009@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
