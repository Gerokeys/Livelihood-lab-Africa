"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";

const stats = [
  { value: "Est. 2023", label: "Incorporated in Kenya" },
  { value: "10+", label: "Service areas" },
  { value: "Africa-wide", label: "Geographic reach" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80"
          alt="East Africa landscape"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Layered overlay: dark forest green tint */}
        <div className="absolute inset-0 bg-[var(--color-forest)] opacity-85" />
        {/* Subtle grain/texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.15) 2px,
              rgba(255,255,255,0.15) 3px
            )`,
          }}
        />
      </div>

      <Container className="flex-1 flex flex-col justify-end pb-16 lg:pb-20 pt-40 lg:pt-48 relative z-10">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-10 lg:mb-14"
        >
          <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-sage)]">
            Livelihood Lab Africa
          </span>
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-sage)]">
            Nairobi, Kenya
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-5xl">
          <motion.h1
            className="text-display font-serif text-[var(--color-cream)] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Turning Evidence
            <br />
            <span className="italic text-[var(--color-mist)]">Into Sustainable</span>
            <br />
            Livelihood Impact
          </motion.h1>

          <motion.p
            className="text-lead text-[var(--color-sage-light)] max-w-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Research, strategy, learning, and institutional support for
            sustainable development across Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link
              href="/research"
              className="text-sm text-[var(--color-mist)] border-b border-[var(--color-amber)] pb-0.5 hover:text-[var(--color-amber)] transition-colors duration-200"
            >
              Explore our research
            </Link>
            <Link
              href="/about"
              className="text-sm text-[var(--color-sage-light)] hover:text-[var(--color-mist)] transition-colors duration-200"
            >
              About the firm →
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-8 border-t border-[var(--color-earth)] grid grid-cols-3 sm:flex sm:items-center gap-8 sm:gap-16"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="font-serif text-xl text-[var(--color-cream)] mb-1">
                {value}
              </div>
              <div className="text-[11px] tracking-wide text-[var(--color-sage)] uppercase">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--color-sage)] origin-top"
        />
        <span className="text-[9px] tracking-[0.14em] uppercase text-[var(--color-sage)] rotate-90 origin-center mt-2">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
