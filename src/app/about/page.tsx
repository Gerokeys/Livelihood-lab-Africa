import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCTA from "@/components/home/ContactCTA";
import { team } from "@/lib/data/team";
import { services, coreValues } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Livelihood Lab Africa — a Kenyan development consultancy founded to bridge the gap between research, policy, and community-level impact across Africa.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560179304-6fc1d8749b23?auto=format&fit=crop&w=1920&q=80"
            alt="Nairobi city skyline"
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
              About the firm
            </p>
            <h1 className="text-headline font-serif text-[var(--color-cream)] max-w-3xl mb-6">
              A consultancy built on evidence, integrity, and African expertise
            </h1>
            <p className="text-lead text-[var(--color-sage-light)] max-w-2xl">
              Incorporated in Nairobi in 2023, Livelihood Lab Africa exists to
              bridge the gap between research, policy, programme implementation,
              and community-level impact.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-[var(--color-cream)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <AnimateIn>
                <SectionLabel number="—" label="Who We Are" />
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-8">
                  Livelihood Lab Africa Ltd is a Kenyan private limited
                  consultancy firm providing strategic consulting, evidence-based
                  research, systematic reviews, technical assistance, MEAL, and
                  capacity development services to public, private, and
                  non-profit organisations across Kenya and the wider African
                  region.
                </p>
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                  We work closely with clients and partners to understand their
                  needs and deliver tailored solutions that support inclusive and
                  sustainable development. Our work is rooted in
                  professionalism, integrity, practical evidence, and a
                  commitment to transforming ideas into measurable development
                  outcomes.
                </p>
              </AnimateIn>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-0">
              <AnimateIn delay={0.1}>
                <div className="p-8 border border-[var(--color-mist-dark)] bg-[var(--color-mist)] mb-0">
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-earth)] mb-4 font-medium">
                    Our Mission
                  </p>
                  <p className="font-serif text-xl text-[var(--color-forest)] leading-snug">
                    To provide evidence-based research, strategic advisory,
                    technical assistance and capacity development services that
                    help organisations design, implement, monitor and improve
                    programmes that advance inclusive livelihoods, institutional
                    effectiveness and sustainable development across Kenya and
                    Africa.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <div className="p-8 border border-[var(--color-mist-dark)] border-t-0 bg-[var(--color-ghost)]">
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-earth)] mb-4 font-medium">
                    Our Vision
                  </p>
                  <p className="font-serif text-xl text-[var(--color-forest)] leading-snug">
                    To become a trusted African consultancy firm recognised for
                    generating practical evidence, strengthening institutions
                    and supporting development actors to deliver inclusive,
                    sustainable and measurable impact.
                  </p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section id="values" className="section-pad bg-[var(--color-warm)]">
        <Container>
          <AnimateIn className="mb-12">
            <SectionLabel number="—" label="Core Values" />
            <h2 className="text-title font-serif text-[var(--color-forest)] max-w-lg">
              The principles that guide every engagement
            </h2>
          </AnimateIn>

          <AnimateInGroup
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[var(--color-warm-dark)]"
            stagger={0.07}
          >
            {coreValues.map((value) => (
              <AnimateInItem key={value.id}>
                <div className="p-7 border-r border-b border-[var(--color-warm-dark)]">
                  <div className="w-6 h-px bg-[var(--color-amber)] mb-5" />
                  <h3 className="font-serif text-lg text-[var(--color-forest)] mb-3">
                    {value.name}
                  </h3>
                  <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInGroup>
        </Container>
      </section>

      {/* Founding Purpose */}
      <section className="section-pad bg-[var(--color-forest)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <AnimateIn>
                <SectionLabel label="Founding Purpose" light />
              </AnimateIn>
            </div>
            <div className="lg:col-span-8">
              <AnimateIn delay={0.15}>
                <blockquote className="font-serif text-2xl lg:text-3xl text-[var(--color-cream)] leading-snug mb-8">
                  &ldquo;We exist to bridge the gap between research, policy,
                  programme implementation and community-level impact.&rdquo;
                </blockquote>
                <p className="text-sm text-[var(--color-sage-light)] leading-relaxed max-w-2xl">
                  Livelihood Lab Africa was founded by development professionals
                  who saw the need for practical, locally grounded and
                  evidence-driven solutions to Africa&apos;s development
                  challenges. The company brings together expertise across
                  research, programme design, project management, MEAL,
                  partnerships, operations, institutional strengthening and
                  client engagement.
                </p>
              </AnimateIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Methodology */}
      <section id="methodology" className="section-pad bg-[var(--color-cream)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <AnimateIn>
                <SectionLabel number="—" label="Methodology" />
                <h2 className="text-title font-serif text-[var(--color-forest)] mb-6">
                  How we work
                </h2>
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-4">
                  Our approach is participatory, evidence-based,
                  context-sensitive and results-oriented. We work closely with
                  clients and stakeholders to define clear objectives,
                  understand the operating context and develop practical
                  solutions that respond to real-world challenges.
                </p>
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                  We combine desk reviews, qualitative and quantitative methods,
                  stakeholder engagement, field research, data analysis,
                  validation sessions and learning-oriented reporting.
                </p>
              </AnimateIn>
            </div>

            <div className="lg:col-span-7">
              <AnimateInGroup className="flex flex-col gap-0" stagger={0.1} delay={0.15}>
                {[
                  {
                    title: "Participatory design",
                    body: "We co-design assignments with clients and key stakeholders, ensuring that research questions, methods, and tools are grounded in the context and serve real decision-making needs.",
                  },
                  {
                    title: "Mixed-methods rigour",
                    body: "We select and combine qualitative, quantitative, and mixed-methods approaches according to the question — always maintaining rigour while remaining responsive to practical constraints.",
                  },
                  {
                    title: "Gender-responsive and inclusive",
                    body: "Across all assignments, we apply gender-responsive, socially inclusive, ethical and locally grounded approaches that centre the voices and realities of marginalised groups.",
                  },
                  {
                    title: "Learning and knowledge transfer",
                    body: "Our methodology emphasises collaboration, quality assurance, practical recommendations and knowledge transfer so that clients can use results beyond the life of each assignment.",
                  },
                ].map((item, i, arr) => (
                  <AnimateInItem key={item.title}>
                    <div
                      className={`py-7 pl-8 border-l-2 ${
                        i < arr.length - 1
                          ? "border-b border-[var(--color-whisper)]"
                          : ""
                      } border-l-[var(--color-mist-dark)] hover:border-l-[var(--color-amber)] transition-colors duration-300`}
                    >
                      <h3 className="font-serif text-base text-[var(--color-forest)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </AnimateInItem>
                ))}
              </AnimateInGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="section-pad bg-[var(--color-warm)]">
        <Container>
          <AnimateIn className="mb-12">
            <SectionLabel number="—" label="Service Areas" />
            <h2 className="text-title font-serif text-[var(--color-forest)] max-w-xl">
              Integrated services across the project cycle
            </h2>
          </AnimateIn>

          <AnimateInGroup
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[var(--color-warm-dark)]"
            stagger={0.06}
          >
            {services.map((service, i) => (
              <AnimateInItem key={service.id}>
                <div
                  className={`py-7 border-b border-[var(--color-warm-dark)] ${
                    i % 2 === 0
                      ? "lg:border-r lg:pr-10"
                      : "lg:pl-10"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-[10px] font-mono text-[var(--color-stone)] mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-base text-[var(--color-forest)] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.capabilities.slice(0, 2).map((cap) => (
                          <span
                            key={cap}
                            className="text-[10px] text-[var(--color-stone)] bg-[var(--color-warm-dark)] px-2 py-0.5"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInGroup>
        </Container>
      </section>

      {/* Leadership */}
      <section id="team" className="section-pad bg-[var(--color-cream)]">
        <Container>
          <AnimateIn className="mb-14">
            <SectionLabel number="—" label="Leadership Team" />
            <h2 className="text-title font-serif text-[var(--color-forest)] max-w-xl mb-4">
              Directors and senior leadership
            </h2>
            <p className="text-sm text-[var(--color-smoke)] max-w-2xl leading-relaxed">
              Livelihood Lab Africa is led by a multidisciplinary team of four
              directors with complementary expertise in partnerships, technical
              delivery, strategy, operations, project management and client
              success. The leadership team is supported by a growing network of
              associate consultants and technical experts.
            </p>
          </AnimateIn>

          <AnimateInGroup className="grid grid-cols-1 lg:grid-cols-2 gap-0" stagger={0.1}>
            {team.map((member, i) => (
              <AnimateInItem key={member.id}>
                <div
                  className={`py-10 ${
                    i % 2 === 0
                      ? "lg:pr-16 lg:border-r border-[var(--color-whisper)]"
                      : "lg:pl-16"
                  } ${i < 2 ? "border-b border-[var(--color-whisper)]" : ""}`}
                >
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="w-14 h-14 bg-[var(--color-mist)] flex items-center justify-center border border-[var(--color-mist-dark)] shrink-0">
                      <span className="font-serif text-lg text-[var(--color-earth)]">
                        {member.initials}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-[var(--color-forest)] mb-0.5">
                        {member.name}
                      </h3>
                      <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-amber)] mb-4">
                        {member.role}
                      </p>
                      <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-5">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] text-[var(--color-earth)] bg-[var(--color-mist)] border border-[var(--color-mist-dark)] px-2.5 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInGroup>
        </Container>
      </section>

      {/* Geographic Coverage with image strip */}
      <section className="section-pad-sm bg-[var(--color-mist)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 mb-12">
            <AnimateIn className="lg:col-span-4">
              <SectionLabel number="—" label="Geographic Coverage" />
            </AnimateIn>
            <AnimateIn delay={0.1} className="lg:col-span-8">
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed max-w-2xl">
                Headquartered in Nairobi, Kenya, Livelihood Lab Africa works
                across Kenya and the wider African region. Through its internal
                team and associate network, the firm can support assignments in
                urban, rural, development, humanitarian and market-based
                contexts across the continent.
              </p>
            </AnimateIn>
          </div>

          {/* Image strip: 3 context photos */}
          <AnimateIn delay={0.15}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { src: "https://images.unsplash.com/photo-1547036965-7aff7e3aefbb?auto=format&fit=crop&w=600&q=80", label: "Rural Kenya" },
                { src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=600&q=80", label: "Nairobi" },
                { src: "https://images.unsplash.com/photo-1589156229687-496a31ad1a1a?auto=format&fit=crop&w=600&q=80", label: "East Africa" },
              ].map(({ src, label }) => (
                <div key={label} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-[var(--color-forest)] opacity-30" />
                  <p className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase text-white/80">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
