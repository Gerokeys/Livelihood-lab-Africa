"use client";

import Image from "next/image";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";

// ─── Partners ─────────────────────────────────────────────────────────────────

const partners = [
  { src: "/malana.png", alt: "Malana Research Consult International Ltd.", width: 180, height: 50 },
  { src: "/feasts.png", alt: "Feasts", width: 56, height: 56 },
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
      {/* Map centred in the background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg opacity-90" style={{ maxHeight: "110%", height: "100%" }}>
          <EastAfricaMap />
        </div>
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 58% at 50% 50%, transparent 22%, var(--color-forest-deep) 86%)",
        }}
      />

      <Container className="relative z-10 py-20 lg:py-28">
        {/* Label */}
        <AnimateIn>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-10 bg-[var(--color-earth)]" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-sage)]">
              Partners &amp; Collaborators — Eastern Africa
            </p>
            <div className="h-px w-10 bg-[var(--color-earth)]" />
          </div>
        </AnimateIn>

        {/* Partner logos */}
        <AnimateInGroup
          className="flex items-center justify-center flex-wrap gap-12 lg:gap-20 mb-14"
          stagger={0.12}
        >
          {partners.map((p) => (
            <AnimateInItem key={p.alt}>
              <div className="opacity-60 hover:opacity-95 transition-opacity duration-300">
                <Image
                  src={p.src} alt={p.alt}
                  width={p.width} height={p.height}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
            </AnimateInItem>
          ))}
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

        {/* Statement */}
        <AnimateIn delay={0.2}>
          <p className="font-serif text-xl lg:text-2xl text-[var(--color-cream)] leading-relaxed text-center max-w-2xl mx-auto mb-12">
            Connecting evidence-based expertise with the organisations driving
            inclusive development across Eastern Africa.
          </p>
        </AnimateIn>

        {/* Country legend */}
        <AnimateIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {CAPITALS.map((d) => (
              <div key={d.country} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-amber)] shrink-0 opacity-90" />
                <span className="text-[10px] tracking-wide text-[var(--color-sage-light)]">
                  {d.country}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
