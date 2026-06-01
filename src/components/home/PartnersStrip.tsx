"use client";

import Image from "next/image";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";

// ─── Partners ─────────────────────────────────────────────────────────────────

const partners = [
  { src: "/malana.png",           alt: "Malana Research Consult International Ltd.", width: 220, height: 70, label: null,            isPhoto: false },
  { src: "/feasts.png",           alt: "Feasts",                                     width: 80,  height: 80, label: "FEAST",          isPhoto: false },
  { src: "/ETC consulting.jpeg",  alt: "ETC Consulting",                             width: 180, height: 70, label: "ETC Consulting",  isPhoto: true  },
];

// ─── Geographic data ──────────────────────────────────────────────────────────
// Natural Earth 110m simplified world atlas (standard react-simple-maps source)
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric codes for East African countries
const EAST_AFRICA = new Set([
  "108", // Burundi
  "232", // Eritrea
  "231", // Ethiopia
  "262", // Djibouti
  "404", // Kenya
  "646", // Rwanda
  "706", // Somalia
  "728", // South Sudan
  "834", // Tanzania
  "800", // Uganda
]);

// Capital cities [country, city, lon, lat]
const CAPITALS: { country: string; city: string; lon: number; lat: number }[] = [
  { country: "Kenya",       city: "Nairobi",     lon: 36.82,  lat: -1.29 },
  { country: "Uganda",      city: "Kampala",     lon: 32.58,  lat:  0.35 },
  { country: "Tanzania",    city: "Dodoma",      lon: 35.74,  lat: -6.17 },
  { country: "Ethiopia",    city: "Addis Ababa", lon: 38.74,  lat:  9.03 },
  { country: "Rwanda",      city: "Kigali",      lon: 30.06,  lat: -1.94 },
  { country: "Burundi",     city: "Gitega",      lon: 29.92,  lat: -3.43 },
  { country: "Somalia",     city: "Mogadishu",   lon: 45.34,  lat:  2.05 },
  { country: "South Sudan", city: "Juba",        lon: 31.57,  lat:  4.85 },
  { country: "Eritrea",     city: "Asmara",      lon: 38.93,  lat: 15.34 },
  { country: "Djibouti",    city: "Djibouti",    lon: 43.15,  lat: 11.59 },
];

// ─── Map ──────────────────────────────────────────────────────────────────────

function EastAfricaMap() {
  return (
    <ComposableMap
      width={500}
      height={620}
      projection="geoMercator"
      projectionConfig={{
        center: [38, 2],   // Geographic center of East Africa
        scale: 950,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Country fills + borders from real Natural Earth data */}
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies
            .filter((geo) => EAST_AFRICA.has(String(geo.id)))
            .map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={0.6}
                style={{
                  default: { outline: "none" },
                  hover:   { fill: "rgba(196,118,58,0.08)", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
        }
      </Geographies>

      {/* Capital city amber markers */}
      {CAPITALS.map(({ country, city, lon, lat }) => (
        <Marker key={country} coordinates={[lon, lat]}>
          {/* Glow rings */}
          <circle r={9} fill="none" stroke="#c4763a" strokeWidth={0.7} opacity={0.25} />
          <circle r={5} fill="none" stroke="#c4763a" strokeWidth={0.7} opacity={0.45} />
          {/* Core dot */}
          <circle r={3} fill="#c4763a" opacity={0.95} />
          <circle cx={-0.8} cy={-0.8} r={1} fill="white" opacity={0.4} />
          {/* Label */}
          <text
            x={7}
            y={4}
            fontSize={6.5}
            fill="white"
            opacity={0.65}
            style={{ fontFamily: "system-ui, sans-serif", userSelect: "none", letterSpacing: "0.8px" }}
          >
            {country}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function PartnersStrip() {
  return (
    <section className="relative bg-[var(--color-forest-deep)] overflow-hidden">
      {/* Map — shifted up, blurred so it reads as decorative texture */}
      <div className="absolute inset-0 flex items-start justify-center" style={{ top: "-10%" }}>
        <div
          className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          style={{ height: "120%", opacity: 1 }}
        >
          <EastAfricaMap />
        </div>
      </div>

      {/* Stronger vignette — keeps text legible over the map */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 45%, rgba(10,28,18,0.45) 0%, var(--color-forest-deep) 72%)",
        }}
      />

      <Container className="relative z-10 pt-10 pb-24 lg:pb-32">
        {/* Label */}
        <AnimateIn>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-10 bg-[var(--color-earth)]" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-sage)]">
              Partners &amp; Collaborators — Eastern Africa
            </p>
            <div className="h-px w-10 bg-[var(--color-earth)]" />
          </div>
        </AnimateIn>

        {/* Partner logos */}
        <AnimateInGroup
          className="flex items-center justify-center flex-wrap gap-14 lg:gap-24 mb-14"
          stagger={0.12}
        >
          {partners.map((p) => (
            <AnimateInItem key={p.alt}>
              <div className="group flex flex-col items-center gap-2.5 opacity-60 hover:opacity-100 transition-all duration-300">
                <Image
                  src={p.src} alt={p.alt}
                  width={p.width} height={p.height}
                  className={[
                    "h-14 lg:h-16 w-auto object-contain transition-all duration-300",
                    p.isPhoto
                      ? "rounded opacity-90"
                      : "brightness-0 invert group-hover:brightness-100 group-hover:invert-0",
                  ].join(" ")}
                />
                {p.label && (
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-sage)] group-hover:text-[var(--color-cream)] transition-colors duration-300">
                    {p.label}
                  </span>
                )}
              </div>
            </AnimateInItem>
          ))}
        </AnimateInGroup>

        {/* Statement */}
        <AnimateIn delay={0.2}>
          <p className="font-serif text-xl lg:text-2xl text-[var(--color-cream)] leading-relaxed text-center max-w-2xl mx-auto mb-14">
            Connecting evidence-based expertise with the organisations driving
            inclusive development across Eastern Africa.
          </p>
        </AnimateIn>

        {/* Stats row */}
        <AnimateIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-24 pt-8 border-t border-[var(--color-earth)]/40">
            {[
              { value: "Est. 2023", label: "Incorporated in Kenya" },
              { value: "10+", label: "Service areas" },
              { value: "Africa-wide", label: "Geographic reach" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-serif text-2xl lg:text-3xl text-[var(--color-cream)] mb-1">{value}</div>
                <div className="text-[10px] tracking-widest uppercase text-[var(--color-sage)]">{label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
