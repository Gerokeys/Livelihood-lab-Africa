import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import Tag from "@/components/ui/Tag";
import { publications } from "@/lib/data/publications";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publications.map((pub) => ({ slug: pub.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) return { title: "Publication Not Found" };
  return {
    title: pub.title,
    description: pub.summary,
  };
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  const related = publications
    .filter((p) => p.slug !== slug && p.category === pub.category)
    .slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 lg:pt-44 lg:pb-16 bg-[var(--color-forest)]">
        <Container>
          <AnimateIn>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-xs text-[var(--color-sage)] hover:text-[var(--color-mist)] transition-colors mb-8"
            >
              ← Back to Research
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Tag variant="forest">{pub.category}</Tag>
              {pub.featured && <Tag variant="amber">Featured</Tag>}
            </div>
            <h1 className="font-serif text-3xl lg:text-4xl text-[var(--color-cream)] leading-snug max-w-3xl mb-6">
              {pub.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-sage-light)]">
              <span>{pub.authors.join(", ")}</span>
              <span>·</span>
              <span>{formatDate(pub.publishDate)}</span>
              {pub.readingTime && (
                <>
                  <span>·</span>
                  <span>{pub.readingTime} min read</span>
                </>
              )}
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Content */}
      <section className="section-pad bg-[var(--color-cream)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-8">
              <AnimateIn>
                <div className="p-8 bg-[var(--color-mist)] border border-[var(--color-mist-dark)] mb-10">
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-earth)] mb-3 font-medium">
                    Abstract
                  </p>
                  <p className="text-base text-[var(--color-forest)] leading-relaxed font-serif">
                    {pub.summary}
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-6">
                    This publication represents part of Livelihood Lab
                    Africa&apos;s ongoing commitment to generating practical
                    evidence that informs development decisions. The full
                    publication is available for download in PDF format.
                  </p>
                  <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-6">
                    For enquiries about this research, commissioning related
                    studies, or accessing the full dataset, please contact our
                    technical team.
                  </p>
                </div>
              </AnimateIn>

              {pub.pdfUrl && (
                <AnimateIn delay={0.15}>
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm font-medium text-[var(--color-cream)] bg-[var(--color-forest)] px-6 py-3 hover:bg-[var(--color-earth)] transition-colors duration-300 mt-4"
                  >
                    Download PDF
                    <span>↓</span>
                  </a>
                </AnimateIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <AnimateIn delay={0.2} direction="left">
                <div className="sticky top-24 space-y-8">
                  {/* Details */}
                  <div className="p-6 border border-[var(--color-whisper)]">
                    <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-stone)] mb-5 font-medium">
                      Publication details
                    </p>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-[var(--color-stone)] mb-1">
                          Category
                        </dt>
                        <dd className="text-sm text-[var(--color-ink)]">
                          {pub.category}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-[var(--color-stone)] mb-1">
                          Authors
                        </dt>
                        <dd className="text-sm text-[var(--color-ink)]">
                          {pub.authors.join(", ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-[var(--color-stone)] mb-1">
                          Published
                        </dt>
                        <dd className="text-sm text-[var(--color-ink)]">
                          {formatDate(pub.publishDate)}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Tags */}
                  <div>
                    <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-stone)] mb-3 font-medium">
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <Tag key={tag} variant="muted">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="p-5 bg-[var(--color-ghost)] border border-[var(--color-whisper)]">
                    <p className="text-xs text-[var(--color-smoke)] mb-3">
                      Interested in commissioning related research?
                    </p>
                    <Link
                      href="/contact"
                      className="text-xs text-[var(--color-amber)] font-medium hover:underline"
                    >
                      Contact our research team →
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad-sm bg-[var(--color-warm)]">
          <Container>
            <AnimateIn className="mb-8">
              <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-stone)] mb-4">
                Related publications
              </p>
            </AnimateIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[var(--color-warm-dark)]">
              {related.map((rel, i) => (
                <Link
                  key={rel.id}
                  href={`/research/${rel.slug}`}
                  className={`group p-7 hover:bg-[var(--color-ghost)] transition-colors duration-300 ${
                    i < related.length - 1
                      ? "border-b lg:border-b-0 lg:border-r border-[var(--color-warm-dark)]"
                      : ""
                  }`}
                >
                  <Tag variant="forest" className="mb-4">
                    {rel.category}
                  </Tag>
                  <h3 className="font-serif text-base text-[var(--color-forest)] leading-snug mb-2 group-hover:text-[var(--color-earth)] transition-colors line-clamp-3">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[var(--color-stone)]">
                    {formatDate(rel.publishDate)}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
