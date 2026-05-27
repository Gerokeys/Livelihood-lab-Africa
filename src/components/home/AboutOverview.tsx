import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";

const pillars = [
  {
    num: "01",
    title: "Evidence-Driven",
    body: "Every recommendation we make is grounded in rigorous data, research, and honest reflection on what works.",
  },
  {
    num: "02",
    title: "Locally Grounded",
    body: "Our team brings deep contextual knowledge of African development realities — not imported solutions.",
  },
  {
    num: "03",
    title: "Globally Competitive",
    body: "We apply internationally rigorous standards while remaining responsive to the unique demands of the African development context.",
  },
];

export default function AboutOverview() {
  return (
    <section className="section-pad bg-[var(--color-cream)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Text block */}
          <div className="lg:col-span-5">
            <AnimateIn>
              <SectionLabel number="—" label="About the Firm" />
              <h2 className="text-headline font-serif text-[var(--color-forest)] mb-6">
                Bridging the gap between research and impact
              </h2>
              <p className="text-lead text-[var(--color-smoke)] mb-6">
                Livelihood Lab Africa was founded by development professionals
                who saw the need for practical, locally grounded and
                evidence-driven solutions to Africa&apos;s development challenges.
              </p>
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-10">
                Incorporated in Kenya in 2023, the firm provides strategic
                consulting, evidence-based research, systematic reviews, technical
                assistance, MEAL, and capacity development services to public,
                private, and non-profit organisations across Kenya and the wider
                African region.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-amber)] link-reveal font-medium"
              >
                Read our story
                <span className="text-base">→</span>
              </Link>
            </AnimateIn>

            {/* Image below the text on small screens, hidden on lg (shown in right col) */}
            <AnimateIn delay={0.15} className="mt-10 lg:hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531206715517-99ad22870ca7?auto=format&fit=crop&w=900&q=80"
                  alt="Development professionals working in the field in Africa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>

          {/* Right: Pillars */}
          <div className="lg:col-span-7">
            <AnimateInGroup className="flex flex-col gap-0" stagger={0.12} delay={0.2}>
              {pillars.map(({ num, title, body }, i) => (
                <AnimateInItem key={num}>
                  <div
                    className={`py-7 flex gap-8 ${
                      i < pillars.length - 1
                        ? "border-b border-[var(--color-whisper)]"
                        : ""
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[var(--color-stone)] mt-1 shrink-0">
                      {num}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-[var(--color-forest)] mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </AnimateInItem>
              ))}
            </AnimateInGroup>

            {/* Large image below pillars on desktop */}
            <AnimateIn delay={0.35} className="mt-8 hidden lg:block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531206715517-99ad22870ca7?auto=format&fit=crop&w=900&q=80"
                  alt="Development professionals engaged in fieldwork and community research"
                  fill
                  className="object-cover"
                  sizes="60vw"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                <p className="absolute bottom-4 left-5 text-[10px] tracking-widest uppercase text-white/70">
                  Field research · Kenya
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
