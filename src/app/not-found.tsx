import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center bg-[var(--color-cream)]">
      <Container>
        <div className="py-24">
          <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-stone)] mb-6">
            404
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl text-[var(--color-forest)] mb-6 leading-none">
            Page not
            <br />
            <span className="italic text-[var(--color-stone)]">found</span>
          </h1>
          <p className="text-sm text-[var(--color-smoke)] mb-10 max-w-md leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have moved. Return
            to the homepage or navigate to another section.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-cream)] bg-[var(--color-forest)] px-8 py-3.5 hover:bg-[var(--color-earth)] transition-colors duration-300"
            >
              Return home
            </Link>
            <Link
              href="/contact"
              className="text-sm text-[var(--color-smoke)] hover:text-[var(--color-amber)] transition-colors link-reveal"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
