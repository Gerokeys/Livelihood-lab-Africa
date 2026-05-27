"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import { publications } from "@/lib/data/publications";
import { formatDate } from "@/lib/utils";
import type { PublicationCategory } from "@/lib/types";

const allCategories: PublicationCategory[] = [
  "Research Report",
  "Systematic Review",
  "Policy Brief",
  "Working Paper",
  "Evaluation",
  "Learning Brief",
];

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState<
    PublicationCategory | "All"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = publications.filter((pub) => {
    const matchesCategory =
      activeCategory === "All" || pub.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      pub.authors.some((a) =>
        a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featured = publications.filter((p) => p.featured)[0];

  return (
    <>
      {/* Header */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
            alt="Research and evidence generation"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--color-forest)] opacity-88" />
        </div>
        <Container className="relative z-10">
          <AnimateIn>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-sage)] mb-6">
              Research & Publications
            </p>
            <h1 className="text-headline font-serif text-[var(--color-cream)] max-w-3xl mb-6">
              Evidence that informs, guides, and transforms
            </h1>
            <p className="text-lead text-[var(--color-sage-light)] max-w-2xl">
              Research reports, systematic reviews, policy briefs and working
              papers on livelihoods, development policy, MEAL, and inclusive
              growth across Africa.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Featured Publication */}
      {featured && (
        <section className="section-pad-sm bg-[var(--color-warm)]">
          <Container>
            <AnimateIn className="mb-8">
              <SectionLabel number="—" label="Featured" />
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <Link
                href={`/research/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[var(--color-warm-dark)] hover:border-[var(--color-sage)] transition-colors duration-300"
              >
                <div className="lg:col-span-8 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[var(--color-warm-dark)]">
                  <div className="flex items-center gap-3 mb-6">
                    <Tag variant="forest">{featured.category}</Tag>
                    <span className="text-[10px] text-[var(--color-stone)]">
                      {formatDate(featured.publishDate)}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[var(--color-forest)] leading-snug mb-5 group-hover:text-[var(--color-earth)] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                    {featured.summary}
                  </p>
                </div>
                <div className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[var(--color-stone)] mb-2">
                      Authors
                    </p>
                    <div className="flex flex-col gap-1 mb-6">
                      {featured.authors.map((author) => (
                        <span
                          key={author}
                          className="text-sm text-[var(--color-ink)]"
                        >
                          {author}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {featured.tags.map((tag) => (
                        <Tag key={tag} variant="muted">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-amber)] font-medium">
                    Read publication
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          </Container>
        </section>
      )}

      {/* Filter + Search + Grid */}
      <section className="section-pad bg-[var(--color-cream)]">
        <Container>
          {/* Search and filter bar */}
          <AnimateIn className="mb-10">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, author, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 pl-4 pr-4 py-2.5 text-sm border border-[var(--color-whisper)] bg-[var(--color-ghost)] text-[var(--color-charcoal)] placeholder:text-[var(--color-stone)] focus:outline-none focus:border-[var(--color-sage)] transition-colors"
                />
              </div>
              <span className="text-xs text-[var(--color-stone)]">
                {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors duration-200 ${
                  activeCategory === "All"
                    ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream)]"
                    : "border-[var(--color-whisper)] text-[var(--color-smoke)] hover:border-[var(--color-stone)]"
                }`}
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors duration-200 ${
                    activeCategory === cat
                      ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream)]"
                      : "border-[var(--color-whisper)] text-[var(--color-smoke)] hover:border-[var(--color-stone)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Publications list */}
          {filtered.length === 0 ? (
            <AnimateIn>
              <div className="py-16 text-center">
                <p className="text-sm text-[var(--color-stone)]">
                  No publications match your search.
                </p>
              </div>
            </AnimateIn>
          ) : (
            <AnimateInGroup className="flex flex-col gap-0" stagger={0.08}>
              {filtered.map((pub, i) => (
                <AnimateInItem key={pub.id}>
                  <Link
                    href={`/research/${pub.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8 border-b border-[var(--color-whisper)] hover:bg-[var(--color-ghost)] -mx-4 px-4 transition-colors duration-300"
                  >
                    <div className="lg:col-span-1 text-[10px] font-mono text-[var(--color-stone)] lg:pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Tag variant="forest">{pub.category}</Tag>
                        {pub.featured && (
                          <Tag variant="amber">Featured</Tag>
                        )}
                      </div>
                      <h3 className="font-serif text-lg text-[var(--color-forest)] leading-snug mb-3 group-hover:text-[var(--color-earth)] transition-colors">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-[var(--color-smoke)] leading-relaxed line-clamp-2">
                        {pub.summary}
                      </p>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-3">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-stone)] mb-1">
                          Authors
                        </p>
                        <p className="text-xs text-[var(--color-ink)]">
                          {pub.authors.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-stone)] mb-1">
                          Published
                        </p>
                        <p className="text-xs text-[var(--color-ink)]">
                          {formatDate(pub.publishDate)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {pub.tags.slice(0, 2).map((tag) => (
                          <Tag key={tag} variant="muted">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-1 flex items-start justify-end">
                      <span className="text-[var(--color-amber)] text-sm group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </Link>
                </AnimateInItem>
              ))}
            </AnimateInGroup>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="section-pad-sm bg-[var(--color-mist)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            <AnimateIn className="lg:col-span-7">
              <h2 className="font-serif text-2xl text-[var(--color-forest)] mb-3">
                Commission a research study or systematic review
              </h2>
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                We work with organisations to design and deliver rigorous,
                practical research that informs decisions and drives better
                outcomes.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1} className="lg:col-span-5 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-[var(--color-cream)] bg-[var(--color-forest)] px-8 py-4 hover:bg-[var(--color-earth)] transition-colors duration-300"
              >
                Get in touch
              </Link>
            </AnimateIn>
          </div>
        </Container>
      </section>
    </>
  );
}
