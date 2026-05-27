"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";

const inquiryTypes = [
  "Research & Evidence Generation",
  "Strategic Consulting",
  "MEAL Services",
  "Capacity Development",
  "Systematic Review",
  "Partnership Enquiry",
  "General Enquiry",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    organisation: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            {/* Form */}
            <div className="lg:col-span-7">
              <AnimateIn>
                <SectionLabel number="—" label="Send an Enquiry" />
              </AnimateIn>

              {submitted ? (
                <AnimateIn delay={0.05}>
                  <div className="py-12 border border-[var(--color-mist-dark)] bg-[var(--color-mist)] px-8">
                    <div className="w-8 h-px bg-[var(--color-amber)] mb-6" />
                    <h2 className="font-serif text-2xl text-[var(--color-forest)] mb-3">
                      Thank you for your enquiry
                    </h2>
                    <p className="text-sm text-[var(--color-smoke)] leading-relaxed">
                      We have received your message and a member of our team
                      will be in touch within two business days. We look forward
                      to speaking with you.
                    </p>
                  </div>
                </AnimateIn>
              ) : (
                <AnimateIn delay={0.05}>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[10px] tracking-[0.1em] uppercase text-[var(--color-stone)] mb-2"
                        >
                          Full name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm border border-[var(--color-whisper)] bg-[var(--color-ghost)] text-[var(--color-charcoal)] placeholder:text-[var(--color-stone)] focus:outline-none focus:border-[var(--color-sage)] transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="organisation"
                          className="block text-[10px] tracking-[0.1em] uppercase text-[var(--color-stone)] mb-2"
                        >
                          Organisation
                        </label>
                        <input
                          id="organisation"
                          name="organisation"
                          type="text"
                          value={formState.organisation}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm border border-[var(--color-whisper)] bg-[var(--color-ghost)] text-[var(--color-charcoal)] placeholder:text-[var(--color-stone)] focus:outline-none focus:border-[var(--color-sage)] transition-colors"
                          placeholder="Your organisation"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] tracking-[0.1em] uppercase text-[var(--color-stone)] mb-2"
                      >
                        Email address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-[var(--color-whisper)] bg-[var(--color-ghost)] text-[var(--color-charcoal)] placeholder:text-[var(--color-stone)] focus:outline-none focus:border-[var(--color-sage)] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="block text-[10px] tracking-[0.1em] uppercase text-[var(--color-stone)] mb-2"
                      >
                        Nature of enquiry
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formState.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-[var(--color-whisper)] bg-[var(--color-ghost)] text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-sage)] transition-colors appearance-none"
                      >
                        <option value="">Select enquiry type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] tracking-[0.1em] uppercase text-[var(--color-stone)] mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-[var(--color-whisper)] bg-[var(--color-ghost)] text-[var(--color-charcoal)] placeholder:text-[var(--color-stone)] focus:outline-none focus:border-[var(--color-sage)] transition-colors resize-none"
                        placeholder="Please describe your enquiry, the scope of work you have in mind, and your expected timeline..."
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-[var(--color-stone)]">
                        We will respond within two business days.
                      </p>
                      <button
                        type="submit"
                        className="text-sm font-medium text-[var(--color-cream)] bg-[var(--color-forest)] px-8 py-3.5 hover:bg-[var(--color-earth)] transition-colors duration-300 shrink-0"
                      >
                        Send message
                      </button>
                    </div>
                  </form>
                </AnimateIn>
              )}
            </div>

            {/* Contact info */}
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
                          Postal Address
                        </p>
                        <p className="text-sm text-[var(--color-ink)] leading-relaxed">
                          P.O. Box 21461-00505
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-1.5">
                          Registration
                        </p>
                        <p className="text-sm text-[var(--color-ink)]">
                          PVT-6Y1Y65Y6
                        </p>
                        <p className="text-sm text-[var(--color-ink)]">
                          KRA PIN: P052468475W
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-whisper)]">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-stone)] mb-4">
                      Areas of engagement
                    </p>
                    <div className="flex flex-col gap-2">
                      {inquiryTypes.slice(0, -1).map((type) => (
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
