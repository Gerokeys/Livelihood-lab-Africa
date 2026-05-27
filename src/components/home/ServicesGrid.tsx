import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { services } from "@/lib/data/services";

const featuredServices = services.slice(0, 6);

export default function ServicesGrid() {
  return (
    <section className="section-pad bg-[var(--color-warm)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14">
          <div className="lg:col-span-6">
            <AnimateIn>
              <SectionLabel number="—" label="Core Services" />
              <h2 className="text-headline font-serif text-[var(--color-forest)]">
                Integrated support across the project cycle
              </h2>
            </AnimateIn>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <AnimateIn delay={0.15}>
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed max-w-md">
                From evidence generation and programme design through to
                evaluation, learning and institutional strengthening — we
                support the full arc of development work.
              </p>
            </AnimateIn>
          </div>
        </div>

        <AnimateInGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
          delay={0.1}
        >
          {featuredServices.map((service, i) => (
            <AnimateInItem key={service.id}>
              <div
                className={`p-7 border-[var(--color-warm-dark)] border group hover:bg-[var(--color-cream)] transition-colors duration-300 ${
                  i % 3 !== 2 ? "lg:border-r-0" : ""
                } ${i < 3 ? "border-b-0 sm:border-b lg:border-b-0" : ""} ${
                  i < featuredServices.length - (featuredServices.length % 3 || 3)
                    ? "lg:border-b-0"
                    : ""
                }`}
              >
                <span className="text-[10px] font-mono text-[var(--color-stone)] mb-4 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg text-[var(--color-forest)] mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-5 line-clamp-3">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.capabilities.slice(0, 2).map((cap) => (
                    <li
                      key={cap}
                      className="text-xs text-[var(--color-stone)] flex items-start gap-1.5"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-mist-dark)] shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInGroup>

        <AnimateIn delay={0.2} className="mt-10 flex items-center gap-6">
          <Link
            href="/about#services"
            className="text-sm text-[var(--color-amber)] font-medium link-reveal"
          >
            View all {services.length} service areas →
          </Link>
        </AnimateIn>
      </Container>
    </section>
  );
}
