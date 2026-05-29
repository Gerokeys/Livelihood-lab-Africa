"use client";

import Image from "next/image";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";

// ─── Partner logos ────────────────────────────────────────────────────────────

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

// ─── Map configuration ────────────────────────────────────────────────────────
// ViewBox: 0 0 500 620
// Projection:
//   x = (lon − 28) × 20.833   (lon range 28 → 52)
//   y = (18 − lat) × 20       (lat range −12 → 18)

const W = 500;
const H = 620;
const DOT_GAP = 11; // px between dots

// Approximate East Africa boundary — clockwise from NW Eritrea
// Each [x, y] derived from [lon, lat] above
const POLYGON: [number, number][] = [
  [177, 2],   // NW Eritrea  (36.5°E, 17.9°N)
  [219, 0],   // N  Eritrea  (38.5°E, 18.0°N)
  [260, 34],  // NE Eritrea — Red Sea  (40.5°E, 16.3°N)
  [323, 130], // Djibouti coast  (43.5°E, 11.5°N)
  [350, 118], // Cape Bir  (44.9°E, 12.1°N)
  [485, 122], // Cape Guardafui — Horn tip  (51.3°E, 11.9°N)
  [490, 145], // NE Somalia  (51.4°E, 10.75°N)
  [479, 200], // N Somalia coast  (51.0°E, 8.0°N)
  [458, 252], // Somalia coast mid-high  (50.0°E, 5.4°N)
  [438, 280], // Somalia coast mid  (49.0°E, 4.0°N)
  [370, 315], // Mogadishu area  (45.7°E, 2.25°N)
  [296, 385], // S Somalia — Kenya border  (42.2°E, −1.1°N)
  [252, 416], // Kenya coast — Malindi  (40.1°E, −2.8°N)
  [244, 440], // Mombasa  (39.7°E, −4.0°N)
  [238, 466], // Tanga, Tanzania  (39.4°E, −5.3°N)
  [234, 496], // Dar es Salaam  (39.2°E, −6.8°N)
  [250, 570], // Tanzania SE — Lindi  (40.0°E, −10.5°N)
  [240, 590], // Cape Delgado  (39.5°E, −11.5°N)
  [168, 608], // S Tanzania — Ruvuma  (36.0°E, −12.2°N) [capped]
  [118, 578], // Tanzania / Zambia  (33.7°E, −10.9°N)
  [60,  556], // Lake Tanganyika SW  (30.9°E, −9.8°N)
  [28,  530], // Lake Tanganyika S  (29.3°E, −8.5°N)
  [22,  478], // Burundi W  (29.1°E, −6.1°N)
  [25,  440], // Burundi / Rwanda W  (29.2°E, −4.0°N)
  [20,  400], // Rwanda W  (29.0°E, −2.0°N)
  [44,  338], // Uganda W — Lake Albert  (30.1°E, 1.1°N)
  [50,  296], // Uganda / S.Sudan / Congo  (30.4°E, 3.2°N)
  [2,   278], // S.Sudan W (clipped to 28°E)  (28.1°E, 4.1°N)
  [0,   162], // S.Sudan NW (clipped)  (28.0°E, 9.9°N)
  [105,  90], // Ethiopia / Sudan border  (33.0°E, 13.5°N)
  [144,  72], // Ethiopia N  (34.9°E, 14.4°N)
  [188,  60], // Ethiopia / Eritrea  (37.0°E, 15.0°N)
  [177,   2], // close — NW Eritrea
];

// Country capitals — [cx, cy] computed from [lon, lat]
const CAPITALS = [
  { country: "Kenya",       city: "Nairobi",     cx: 183, cy: 386 },
  { country: "Uganda",      city: "Kampala",     cx:  95, cy: 353 },
  { country: "Tanzania",    city: "Dodoma",      cx: 161, cy: 483 },
  { country: "Ethiopia",    city: "Addis Ababa", cx: 224, cy: 179 },
  { country: "Rwanda",      city: "Kigali",      cx:  43, cy: 399 },
  { country: "Burundi",     city: "Gitega",      cx:  41, cy: 429 },
  { country: "Somalia",     city: "Mogadishu",   cx: 360, cy: 319 },
  { country: "South Sudan", city: "Juba",        cx:  74, cy: 263 },
  { country: "Eritrea",     city: "Asmara",      cx: 228, cy:  53 },
  { country: "Djibouti",    city: "Djibouti",    cx: 316, cy: 128 },
];

// Shared-border connections between country capitals
const CONNECTIONS: [string, string][] = [
  ["Kenya",       "Uganda"],
  ["Kenya",       "Tanzania"],
  ["Kenya",       "Ethiopia"],
  ["Kenya",       "Somalia"],
  ["Kenya",       "South Sudan"],
  ["Uganda",      "Tanzania"],
  ["Uganda",      "Rwanda"],
  ["Uganda",      "South Sudan"],
  ["Tanzania",    "Rwanda"],
  ["Tanzania",    "Burundi"],
  ["Ethiopia",    "Somalia"],
  ["Ethiopia",    "South Sudan"],
  ["Ethiopia",    "Eritrea"],
  ["Ethiopia",    "Djibouti"],
  ["Eritrea",     "Djibouti"],
  ["Somalia",     "Djibouti"],
  ["Rwanda",      "Burundi"],
];

// Build a lookup map for quick coordinate access
const CAP_MAP = Object.fromEntries(
  CAPITALS.map((c) => [c.country, { cx: c.cx, cy: c.cy }])
);

// ─── Point-in-polygon (ray casting) ──────────────────────────────────────────

function inside(px: number, py: number, poly: [number, number][]): boolean {
  let hit = false;
  const n = poly.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
}

// Pre-compute dot grid once at module load
const DOTS: { cx: number; cy: number }[] = [];
for (let y = DOT_GAP / 2; y < H; y += DOT_GAP) {
  for (let x = DOT_GAP / 2; x < W; x += DOT_GAP) {
    if (inside(x, y, POLYGON)) DOTS.push({ cx: x, cy: y });
  }
}

// ─── SVG Map component ────────────────────────────────────────────────────────

function EastAfricaMap() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Radial fade so edges of dot field dissolve */}
        <radialGradient id="ea-fade" cx="45%" cy="48%" r="52%">
          <stop offset="10%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="ea-mask">
          <rect x="0" y="0" width={W} height={H} fill="url(#ea-fade)" />
        </mask>

        {/* Amber glow filter for capital dots */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── White background dots inside polygon ── */}
      <g mask="url(#ea-mask)">
        {DOTS.map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="1.3" fill="white" opacity="0.22" />
        ))}
      </g>

      {/* ── Polygon border — whisper thin ── */}
      <polygon
        points={POLYGON.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.1"
      />

      {/* ── Border connection lines between neighbouring capitals ── */}
      <g opacity="0.35">
        {CONNECTIONS.map(([a, b]) => {
          const from = CAP_MAP[a];
          const to   = CAP_MAP[b];
          if (!from || !to) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={from.cx} y1={from.cy}
              x2={to.cx}   y2={to.cy}
              stroke="#c4763a"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
          );
        })}
      </g>

      {/* ── Amber capital dots ── */}
      {CAPITALS.map((d) => (
        <g key={d.country} filter="url(#glow)">
          {/* Outer ring */}
          <circle
            cx={d.cx}
            cy={d.cy}
            r="9"
            fill="none"
            stroke="#c4763a"
            strokeWidth="0.8"
            opacity="0.35"
          />
          {/* Mid ring */}
          <circle
            cx={d.cx}
            cy={d.cy}
            r="5"
            fill="none"
            stroke="#c4763a"
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Core dot */}
          <circle cx={d.cx} cy={d.cy} r="3" fill="#c4763a" opacity="0.95" />
          {/* Specular highlight */}
          <circle cx={d.cx - 0.8} cy={d.cy - 0.8} r="1" fill="white" opacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function PartnersStrip() {
  return (
    <section className="relative bg-[var(--color-forest-deep)] overflow-hidden">

      {/* Map — full-bleed background, centered */}
      <div className="absolute inset-0 flex items-center justify-center py-8">
        <div
          className="w-full max-w-sm lg:max-w-md xl:max-w-lg h-full"
          style={{ maxHeight: "110%" }}
        >
          <EastAfricaMap />
        </div>
      </div>

      {/* Radial vignette so edges fade cleanly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 72% 60% at 50% 50%, transparent 25%, var(--color-forest-deep) 88%)",
        }}
      />

      {/* Content */}
      <Container className="relative z-10 py-20 lg:py-28">

        {/* Section label */}
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
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
            </AnimateInItem>
          ))}

          {/* Future logo placeholders */}
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
        <AnimateIn delay={0.2}>
          <p className="font-serif text-xl lg:text-2xl text-[var(--color-cream)] leading-relaxed text-center max-w-2xl mx-auto mb-12">
            Connecting evidence-based expertise with the organisations driving
            inclusive development across Eastern Africa.
          </p>
        </AnimateIn>

        {/* Country presence legend */}
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
