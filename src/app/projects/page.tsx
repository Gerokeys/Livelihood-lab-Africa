import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import ContactCTA from "@/components/home/ContactCTA";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and selected project work from Livelihood Lab Africa across research, MEAL, strategic consulting, and capacity development.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      {/* Header */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=1920&q=80"
            alt="Development work in Africa"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--color-forest)] opacity-85" />
        </div>
        <Container className="relative z-10">
          <AnimateIn>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-sage)] mb-6">
              Projects
            </p>
            <h1 className="text-headline font-serif text-[var(--color-cream)] max-w-3xl mb-6">
              Selected work across Africa&apos;s development landscape
            </h1>
            <p className="text-lead text-[var(--color-sage-light)] max-w-2xl">
              From livelihood assessments in arid Kenya to regional evidence
              reviews, our work spans sectors, geographies and development
              challenges.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="section-pad bg-[var(--color-cream)]">
        <Container>
          <AnimateIn className="mb-12">
            <SectionLabel number="—" label="Featured Work" />
          </AnimateIn>

          {(() => {
            const featuredImages = [
              "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1589156229687-496a31ad1a1a?auto=format&fit=crop&w=900&q=80",
            ];
            return (
          <AnimateInGroup className="flex flex-col gap-0" stagger={0.1}>
            {featured.map((project, i) => (
              <AnimateInItem key={project.id}>
                <div
                  id={project.slug}
                  className={`py-12 border-b border-[var(--color-whisper)] ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left: meta + image */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                      {/* Project image */}
                      <div className="relative aspect-[4/3] overflow-hidden mb-2">
                        <Image
                          src={featuredImages[i] ?? featuredImages[0]}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-[var(--color-forest)] opacity-20" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-stone)] mb-1">
                          Sector
                        </p>
                        <p className="text-sm text-[var(--color-ink)] font-medium">
                          {project.sector}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-stone)] mb-1">
                          Region
                        </p>
                        <p className="text-sm text-[var(--color-ink)]">
                          {project.region}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-[var(--color-stone)] mb-1">
                          Duration
                        </p>
                        <p className="text-sm text-[var(--color-ink)]">
                          {project.duration}
                        </p>
                      </div>
                      <Tag
                        variant={
                          project.status === "Active" ? "forest" : "muted"
                        }
                      >
                        {project.status}
                      </Tag>
                    </div>

                    {/* Right: content */}
                    <div className="lg:col-span-9">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="font-serif text-2xl lg:text-3xl text-[var(--color-forest)] leading-snug flex-1">
                          {project.title}
                        </h2>
                        <span className="text-[10px] font-mono text-[var(--color-stone)] shrink-0 mt-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-8 max-w-2xl">
                        {project.description}
                      </p>

                      {/* Outcomes */}
                      <div className="mb-6">
                        <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-stone)] mb-4 font-medium">
                          Key outcomes
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.outcomes.map((outcome) => (
                            <li
                              key={outcome}
                              className="flex items-start gap-3 text-sm text-[var(--color-smoke)]"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Services used */}
                      <div>
                        <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-stone)] mb-3 font-medium">
                          Services delivered
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.services.map((service) => (
                            <Tag key={service} variant="forest">
                              {service}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInGroup>
            );
          })()}
        </Container>
      </section>

      {/* Additional projects */}
      {rest.length > 0 && (
        <section className="section-pad-sm bg-[var(--color-warm)]">
          <Container>
            <AnimateIn className="mb-10">
              <SectionLabel number="—" label="Additional Work" />
            </AnimateIn>

            <AnimateInGroup className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[var(--color-warm-dark)]" stagger={0.08}>
              {rest.map((project, i) => (
                <AnimateInItem key={project.id}>
                  <div
                    id={project.slug}
                    className={`py-8 ${
                      i % 2 === 0
                        ? "lg:pr-10 lg:border-r border-[var(--color-warm-dark)]"
                        : "lg:pl-10"
                    } border-b border-[var(--color-warm-dark)]`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-serif text-xl text-[var(--color-forest)] leading-snug flex-1">
                        {project.title}
                      </h3>
                      <Tag
                        variant={
                          project.status === "Active" ? "forest" : "muted"
                        }
                      >
                        {project.status}
                      </Tag>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 text-xs text-[var(--color-stone)]">
                      <span>{project.sector}</span>
                      <span>·</span>
                      <span>{project.region}</span>
                      <span>·</span>
                      <span>{project.duration}</span>
                    </div>
                    <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.services.map((service) => (
                        <Tag key={service} variant="muted">
                          {service}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </AnimateInItem>
              ))}
            </AnimateInGroup>
          </Container>
        </section>
      )}

      {/* Approach note */}
      <section className="section-pad-sm bg-[var(--color-mist)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8">
            <AnimateIn className="lg:col-span-4">
              <SectionLabel number="—" label="Our Approach to Projects" />
            </AnimateIn>
            <AnimateIn delay={0.1} className="lg:col-span-8">
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed max-w-2xl mb-4">
                We approach every project as a partnership. Our teams embed
                alongside clients to understand context, co-design approaches,
                and ensure findings are practically useful — not just
                technically correct.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-amber)] font-medium link-reveal"
              >
                Discuss a project with us →
              </Link>
            </AnimateIn>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
