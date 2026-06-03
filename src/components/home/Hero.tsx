"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Nandi county.jpeg"
          alt="Livelihood Lab Africa working with women farmers in Nandi County"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Layered overlay: dark forest green tint */}
        <div className="absolute inset-0 bg-[var(--color-forest)] opacity-55" />
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

      {/* Bottom fade — blends into the map section below */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-forest-deep))" }}
      />

      <Container className="flex-1 flex flex-col items-center justify-center pt-16 pb-16 lg:pt-24 lg:pb-20 relative z-20 text-center">
        {/* Main headline */}
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className="text-display font-serif text-[var(--color-cream)] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Turning Evidence
            <br />
            <span className="italic text-[var(--color-mist)]">Into Sustainable</span>
            <br />
            Livelihood Impact
          </motion.h1>

          <motion.p
            className="text-lead text-[var(--color-sage-light)] max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Research, strategy, learning, and institutional support for
            sustainable development across Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-6 lg:mt-0"
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
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 z-20"
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
