import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import { publications } from "@/lib/data/publications";
import { formatDate } from "@/lib/utils";

const featured = publications.filter((p) => p.featured).slice(0, 3);

export default function FeaturedPublications() {
  return (
    <section className="section-pad bg-[var(--color-cream)]">
      <Container>
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <AnimateIn>
            <SectionLabel number="—" label="Research & Publications" />
            <h2 className="text-headline font-serif text-[var(--color-forest)] max-w-lg">
              Evidence for decisions that matter
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link
              href="/research"
              className="text-sm text-[var(--color-amber)] font-medium link-reveal shrink-0"
            >
              All publications →
            </Link>
          </AnimateIn>
        </div>

        <AnimateInGroup className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[var(--color-whisper)]" stagger={0.1}>
          {featured.map((pub, i) => (
            <AnimateInItem key={pub.id}>
              <Link
                href={`/research/${pub.slug}`}
                className={`group flex flex-col h-full p-8 hover:bg-[var(--color-ghost)] transition-colors duration-300 ${
                  i < featured.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-[var(--color-whisper)]"
                    : ""
                }`}
              >
                {/* Category + date */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Tag variant="forest">{pub.category}</Tag>
                  <span className="text-[10px] text-[var(--color-stone)]">
                    {formatDate(pub.publishDate)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg text-[var(--color-forest)] leading-snug mb-4 group-hover:text-[var(--color-earth)] transition-colors">
                  {pub.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed line-clamp-3 flex-1 mb-6">
                  {pub.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-whisper)]">
                  <span className="text-xs text-[var(--color-stone)]">
                    {pub.authors.join(", ")}
                  </span>
                  {pub.readingTime && (
                    <span className="text-[10px] text-[var(--color-stone)]">
                      {pub.readingTime} min read
                    </span>
                  )}
                </div>
              </Link>
            </AnimateInItem>
          ))}
        </AnimateInGroup>
      </Container>
    </section>
  );
}
