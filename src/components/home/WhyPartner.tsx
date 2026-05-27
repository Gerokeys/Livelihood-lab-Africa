import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";

const reasons = [
  {
    title: "Locally grounded, regionally connected",
    body: "Our team has deep contextual knowledge of African development realities, bringing relevant insights no external firm can replicate.",
  },
  {
    title: "Flexible associate network",
    body: "A growing pool of technical specialists and associates allows us to scale expertise to match the precise demands of each assignment.",
  },
  {
    title: "Evidence, learning and practical application",
    body: "We don't just produce reports. We embed learning processes that ensure findings are understood, owned, and used.",
  },
  {
    title: "End-to-end support",
    body: "From research design and baseline studies through to midline, endline, and institutional learning — we can support the full project lifecycle.",
  },
  {
    title: "Integrity and accountability",
    body: "We hold ourselves to the highest standards of professionalism, transparency and ethical practice in every engagement.",
  },
  {
    title: "Adaptive and collaborative",
    body: "We work with clients, not for them — adapting our methods and approach to serve the real needs of each context.",
  },
];

export default function WhyPartner() {
  return (
    <section className="section-pad bg-[var(--color-mist)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <AnimateIn>
              <SectionLabel number="—" label="Why Partner With Us" />
              <h2 className="text-headline font-serif text-[var(--color-forest)] mb-6">
                A firm you can build with
              </h2>
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                We bring the rigour of international development practice with
                the agility and insight of an African firm that knows this
                terrain intimately.
              </p>
            </AnimateIn>
          </div>

          <div className="lg:col-span-8">
            <AnimateInGroup
              className="grid grid-cols-1 sm:grid-cols-2 gap-0"
              stagger={0.08}
              delay={0.15}
            >
              {reasons.map((reason, i) => (
                <AnimateInItem key={reason.title}>
                  <div
                    className={`py-7 px-0 sm:px-6 ${
                      i % 2 === 0 ? "sm:pl-0" : "sm:pr-0"
                    } ${
                      i % 2 === 0
                        ? "sm:border-r border-[var(--color-mist-dark)]"
                        : ""
                    } ${
                      i < reasons.length - 2
                        ? "border-b border-[var(--color-mist-dark)]"
                        : ""
                    }`}
                  >
                    <div className="w-5 h-px bg-[var(--color-amber)] mb-4" />
                    <h3 className="font-serif text-base text-[var(--color-forest)] mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                      {reason.body}
                    </p>
                  </div>
                </AnimateInItem>
              ))}
            </AnimateInGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
