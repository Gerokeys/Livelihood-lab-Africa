import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { team } from "@/lib/data/team";

export default function LeadershipPreview() {
  return (
    <section className="section-pad bg-[var(--color-cream)] overflow-hidden">
      <Container>
        {/* Header + image side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 items-end">
          <div className="lg:col-span-7">
            <AnimateIn>
              <SectionLabel number="—" label="Leadership" />
              <h2 className="text-headline font-serif text-[var(--color-forest)] max-w-lg">
                A multidisciplinary team of development professionals
              </h2>
            </AnimateIn>
          </div>
          <div className="lg:col-span-5 flex items-end justify-between gap-4">
            <AnimateIn delay={0.1}>
              <p className="text-sm text-[var(--color-smoke)] leading-relaxed max-w-xs">
                Four directors with complementary expertise in strategy,
                technical delivery, programme management and client success.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <Link
                href="/about#team"
                className="text-sm text-[var(--color-amber)] font-medium link-reveal shrink-0 self-end"
              >
                Meet the team →
              </Link>
            </AnimateIn>
          </div>
        </div>

        {/* Team image banner */}
        <AnimateIn delay={0.1} className="mb-12">
          <div className="relative w-full aspect-[21/7] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&w=1600&q=80"
              alt="Team of development professionals in Nairobi"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-forest)] via-transparent to-transparent opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cream)] via-transparent to-transparent opacity-60" />
          </div>
        </AnimateIn>

        {/* Team members */}
        <AnimateInGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[var(--color-whisper)]"
          stagger={0.09}
          delay={0.1}
        >
          {team.map((member, i) => (
            <AnimateInItem key={member.id}>
              <div
                className={`pt-8 pb-4 ${
                  i < team.length - 1
                    ? "pr-0 lg:pr-8 lg:border-r border-[var(--color-whisper)]"
                    : ""
                } ${i > 0 ? "lg:pl-8" : ""}`}
              >
                {/* Avatar — richly styled with initials */}
                <div className="w-14 h-14 bg-[var(--color-forest)] flex items-center justify-center mb-5">
                  <span className="font-serif text-lg text-[var(--color-cream)]">
                    {member.initials}
                  </span>
                </div>

                <h3 className="font-serif text-base text-[var(--color-forest)] mb-0.5">
                  {member.name}
                </h3>
                <p className="text-xs tracking-wide text-[var(--color-amber)] uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInGroup>
      </Container>
    </section>
  );
}
