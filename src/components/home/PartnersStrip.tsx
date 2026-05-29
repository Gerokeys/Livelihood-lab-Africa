"use client";

import Image from "next/image";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";

const partners = [
  {
    src: "/malana.png",
    alt: "Malana Research Consult International Ltd.",
    width: 180,
    height: 50,
  },
  {
    src: "/feasts.png",
    alt: "Feasts",
    width: 56,
    height: 56,
  },
];

/* Dot map SVG — simplified East Africa silhouette filled with dots */
function EastAfricaMap() {
  const dotSpacing = 12;
  const cols = 52;
  const rows = 58;

  // Approximate East Africa polygon in SVG units (0-624 x 0-696)
  // Covers Ethiopia, Somalia, Kenya, Uganda, Tanzania, Rwanda, Burundi
  const regionPolygon = `
    230,10  260,8   290,14  318,10  345,18  370,14  395,22
    415,38  430,62  440,90  450,118 445,148 435,170 440,200
    445,230 435,255 420,278 430,310 440,340 435,365 420,385
    400,400 375,415 348,425 320,430 295,435 270,440 250,448
    228,455 205,450 185,440 168,425 155,405 145,382 138,355
    132,325 130,295 138,265 148,238 150,208 145,178 140,148
    138,118 145,90  155,65  168,45  185,30  205,18  220,12
  `.trim();

  const dots: { cx: number; cy: number }[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * dotSpacing + 6;
      const cy = row * dotSpacing + 6;
      dots.push({ cx, cy });
    }
  }

  return (
    <svg
      viewBox="0 0 624 696"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="east-africa-clip">
          <polygon points={regionPolygon} />
        </clipPath>
        {/* Fade edges of the clipped dot region */}
        <radialGradient id="dot-fade" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fade-mask">
          <rect x="0" y="0" width="624" height="696" fill="url(#dot-fade)" />
        </mask>
      </defs>

      {/* Dots clipped to East Africa shape, then faded at edges */}
      <g clipPath="url(#east-africa-clip)" mask="url(#fade-mask)" opacity="0.18">
        {dots.map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill="white" />
        ))}
      </g>

      {/* Faint polygon outline */}
      <polygon
        points={regionPolygon}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.06"
      />
    </svg>
  );
}

export default function PartnersStrip() {
  return (
    <section className="relative py-20 lg:py-28 bg-[var(--color-forest-deep)] overflow-hidden">
      {/* East Africa dot map */}
      <EastAfricaMap />

      {/* Subtle vignette over map */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--color-forest-deep) 100%)",
        }}
      />

      <Container className="relative z-10">
        {/* Section label */}
        <AnimateIn>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-[var(--color-earth)]" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-sage)]">
              Partners &amp; Collaborators — Eastern Africa
            </p>
            <div className="h-px w-12 bg-[var(--color-earth)]" />
          </div>
        </AnimateIn>

        {/* Partner logos */}
        <AnimateInGroup
          className="flex items-center justify-center flex-wrap gap-12 lg:gap-20 mb-16"
          stagger={0.12}
        >
          {partners.map((partner) => (
            <AnimateInItem key={partner.alt}>
              <div className="flex items-center justify-center opacity-60 hover:opacity-90 transition-opacity duration-300">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
            </AnimateInItem>
          ))}

          {/* Placeholder slots for future logos */}
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-10 w-24 border border-dashed border-[var(--color-earth)] opacity-20 flex items-center justify-center"
            >
              <span className="text-[9px] tracking-widest uppercase text-[var(--color-sage)]">
                Partner
              </span>
            </div>
          ))}
        </AnimateInGroup>

        {/* Central statement */}
        <AnimateIn delay={0.25}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif text-xl lg:text-2xl text-[var(--color-cream)] leading-relaxed">
              Connecting evidence-based expertise with the organisations driving
              inclusive development across Eastern Africa.
            </p>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
