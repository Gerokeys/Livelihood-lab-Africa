import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";

export default function ContactCTA() {
  return (
    <section className="section-pad bg-[var(--color-forest-deep)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-8">
            <AnimateIn>
              <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-sage)] mb-6">
                Start a conversation
              </p>
              <h2 className="text-headline font-serif text-[var(--color-cream)] mb-6">
                Let&apos;s build evidence-based solutions together
              </h2>
              <p className="text-sm text-[var(--color-sage-light)] leading-relaxed max-w-xl">
                Whether you are looking for a research partner, an evaluation
                team, strategic advisory or capacity support — we would welcome
                the opportunity to discuss your needs.
              </p>
            </AnimateIn>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <AnimateIn delay={0.15}>
              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-[var(--color-charcoal)] bg-[var(--color-cream)] px-8 py-4 hover:bg-[var(--color-amber)] hover:text-white transition-colors duration-300"
              >
                Get in touch
              </Link>
              <p className="text-xs text-[var(--color-sage)] mt-3 lg:text-right">
                Or email us at{" "}
                <a
                  href="mailto:llabafrica009@gmail.com"
                  className="text-[var(--color-sage-light)] hover:text-[var(--color-amber)] transition-colors"
                >
                  llabafrica009@gmail.com
                </a>
              </p>
            </AnimateIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
