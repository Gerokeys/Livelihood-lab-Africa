import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    label: "Define",
    description:
      "We work closely with clients to clarify objectives, understand the operating context, and agree on practical questions that research can answer.",
  },
  {
    label: "Design",
    description:
      "Methodology is tailored to context. We combine qualitative, quantitative and mixed-methods approaches, always mindful of rigour and real-world constraints.",
  },
  {
    label: "Deliver",
    description:
      "Field research, data collection, analysis and validation sessions produce evidence that is robust, readable and actionable.",
  },
  {
    label: "Embed",
    description:
      "Results are translated into practical recommendations and shared through learning processes that build capacity and drive sustained change.",
  },
];

export default function ResearchApproach() {
  return (
    <section className="section-pad bg-[var(--color-forest)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimateIn>
              <SectionLabel label="Our Approach" light />
              <h2 className="text-headline font-serif text-[var(--color-cream)] mb-6">
                Participatory, rigorous, and results-oriented
              </h2>
              <p className="text-sm text-[var(--color-sage-light)] leading-relaxed mb-6">
                Our approach is evidence-based, context-sensitive, and designed
                to produce findings that are used — not just filed. We combine
                desk review, field research, stakeholder engagement, data
                analysis and learning-oriented reporting.
              </p>
              <p className="text-sm text-[var(--color-sage-light)] leading-relaxed mb-10">
                Across all assignments, we apply gender-responsive, socially
                inclusive, and locally grounded methodologies. Quality
                assurance and practical knowledge transfer are embedded
                throughout.
              </p>
            </AnimateIn>

            {/* Image */}
            <AnimateIn delay={0.2} className="flex-1">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="Data analysis and research methodology work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-[var(--color-forest-deep)] opacity-40" />
                <div className="absolute inset-0 mix-blend-multiply opacity-20 bg-[var(--color-sage)]" />
              </div>
            </AnimateIn>
          </div>

          {/* Right: Process steps */}
          <div className="lg:col-span-7">
            <AnimateInGroup className="grid grid-cols-1 sm:grid-cols-2 gap-0" stagger={0.1} delay={0.2}>
              {steps.map((step, i) => (
                <AnimateInItem key={step.label}>
                  <div
                    className={`p-6 border-[var(--color-earth)] ${
                      i % 2 === 0 ? "border-r" : ""
                    } ${i < 2 ? "border-b" : ""}`}
                  >
                    <div className="text-[10px] font-mono text-[var(--color-sage)] mb-3 tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-serif text-xl text-[var(--color-amber)] mb-3">
                      {step.label}
                    </h3>
                    <p className="text-sm text-[var(--color-sage-light)] leading-relaxed">
                      {step.description}
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
