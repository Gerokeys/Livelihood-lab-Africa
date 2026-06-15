import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";

const inquiryTypes = [
  "Research & Evidence Generation",
  "Strategic Consulting",
  "MEAL Services",
  "Capacity Development",
  "Systematic Review",
  "Partnership Enquiry",
];

const mailtoHref =
  "mailto:llabafrica009@gmail.com" +
  "?subject=Enquiry%20%E2%80%94%20[Your%20topic]" +
  "&body=Hi%20Livelihood%20Lab%20Africa%20Team%2C%0A%0AName%3A%20%0AOrganisation%3A%20%0AEnquiry%20type%3A%20%0A%0AMessage%3A%20";

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 bg-[var(--color-forest)]">
        <Container>
          <AnimateIn>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-sage)] mb-6">
              Contact
            </p>
            <h1 className="text-headline font-serif text-[var(--color-cream)] max-w-3xl mb-6">
              Let&apos;s start a conversation
            </h1>
            <p className="text-lead text-[var(--color-sage-light)] max-w-2xl">
              Whether you are commissioning research, seeking strategic support,
              or exploring a partnership — we would be glad to hear from you.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Main content */}
      <section id="inquiries" className="section-pad bg-[var(--color-cream)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Direct contact CTA */}
            <div className="lg:col-span-7">
              <AnimateIn>
                <SectionLabel number="—" label="Send an Enquiry" />
                <h2 className="text-headline font-serif text-[var(--color-forest)] mb-6">
                  Reach us directly
                </h2>
                <p className="text-sm text-[var(--color-smoke)] leading-relaxed mb-10 max-w-md">
                  Send us an email and we&apos;ll be in touch within two business days.
                  To help us respond quickly, let us know your name, organisation,
                  the nature of your enquiry, and a brief description of what
                  you have in mind.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-3 bg-[var(--color-forest)] text-[var(--color-cream)] text-sm font-medium px-8 py-4 hover:bg-[var(--color-earth)] transition-colors duration-300 mb-12"
                >
                  Compose email →
                </a>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <div className="border-t border-[var(--color-whisper)] pt-10">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-6">
                    What to include
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Your name & organisation", hint: "So we know who we are speaking with" },
                      { label: "Nature of enquiry", hint: "See our service areas on the right" },
                      { label: "Scope or context", hint: "Brief overview of the assignment or need" },
                      { label: "Expected timeline", hint: "When do you need support to begin?" },
                    ].map(({ label, hint }) => (
                      <div key={label} className="flex gap-3">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                        <div>
                          <p className="text-sm text-[var(--color-ink)] font-medium">{label}</p>
                          <p className="text-xs text-[var(--color-stone)] mt-0.5">{hint}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right: Contact info */}
            <div className="lg:col-span-5">
              <AnimateIn delay={0.15} direction="left">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <SectionLabel number="—" label="Office Details" />
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-1.5">
                          Email
                        </p>
                        <a
                          href="mailto:llabafrica009@gmail.com"
                          className="text-sm text-[var(--color-ink)] hover:text-[var(--color-amber)] transition-colors link-reveal"
                        >
                          llabafrica009@gmail.com
                        </a>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-1.5">
                          Phone
                        </p>
                        <a
                          href="tel:+254725000931"
                          className="text-sm text-[var(--color-ink)] hover:text-[var(--color-amber)] transition-colors link-reveal"
                        >
                          +254 725 000 931
                        </a>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-1.5">
                          Postal Address
                        </p>
                        <p className="text-sm text-[var(--color-ink)] leading-relaxed">
                          P.O. Box 21461-00505
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-whisper)]">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-4">
                      Areas of engagement
                    </p>
                    <div className="flex flex-col gap-2">
                      {inquiryTypes.map((type) => (
                        <div
                          key={type}
                          className="flex items-center gap-3 text-sm text-[var(--color-smoke)]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--color-mist-dark)] shrink-0" />
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--color-mist)] border border-[var(--color-mist-dark)]">
                    <p className="font-serif text-base text-[var(--color-forest)] mb-2">
                      Working with partners across Africa
                    </p>
                    <p className="text-xs text-[var(--color-smoke)] leading-relaxed">
                      We can support assignments in urban, rural, development,
                      humanitarian and market-based contexts across Kenya and
                      the wider African region.
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
