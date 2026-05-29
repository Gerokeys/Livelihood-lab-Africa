"use client";

import Image from "next/image";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";

// ─── Partners ─────────────────────────────────────────────────────────────────

const partners = [
  { src: "/malana.png", alt: "Malana Research Consult International Ltd.", width: 180, height: 50 },
  { src: "/feasts.png", alt: "Feasts", width: 56, height: 56 },
];

// ─── Projection ───────────────────────────────────────────────────────────────
// ViewBox: 0 0 500 620
// x = (lon − 28) × 20.833        lon range 28°E → 52°E
// y = (18 − lat) × 20            lat range 18°N → −12°S (y increases downward)

const W = 500;
const H = 620;
const DOT_GAP = 11;

// Outer East-Africa boundary (clockwise, NW Eritrea → Horn → Tanzania → Uganda)
const POLYGON: [number, number][] = [
  [177,  2], [219,  0], [260, 34], [302,110], [313,130],
  [325,132], [350,118], [485,122], [490,145], [479,200],
  [458,252], [438,280], [361,318], [292,370], [281,394],
  [262,416], [244,440], [240,454], [230,480], [234,496],
  [250,570], [240,590], [168,608], [118,578], [60, 556],
  [28, 530], [22, 478], [25, 440], [20, 400], [44, 338],
  [50, 296], [2,  278], [0,  162], [105, 90], [144, 72],
  [188, 60], [177,  2],
];

// ─── Internal country borders (geographically corrected polylines) ─────────────
//
// Coordinate reminders:
//   Eritrea/Ethiopia border  → lat ~14.9–15.3°N  (y ≈ 54–62)
//   Ethiopia/Somalia (Ogaden)→ curves east to ~lon 44–45°E through the middle
//   Kenya/Uganda border      → roughly lon 34–35°E, lat 4.2°N → −1°S
//   Kenya/Tanzania border    → diagonal from Lake Victoria (−1°S, 33.9°E)
//                              to Indian Ocean coast (~−4.7°S, 39.5°E)
//   Uganda/Tanzania border   → along Lake Victoria S shore, ~lat −1°S
//   Rwanda/Uganda/Tanzania   → tripoint near (30.5°E, −1.3°S)

const BORDERS: { key: string; pts: [number, number][] }[] = [
  // ── Eritrea / Ethiopia ──────────────────────────────────────────────────────
  // Runs E-W from Sudan-border at ~(36.5°E,14.9°N) to Djibouti at (42.5°E,12.5°N)
  { key: "eri-eth", pts: [
    [177, 62],  // 36.5°E 14.9°N — SW Eritrea / Ethiopia
    [208, 62],  // 38°E   14.9°N
    [240, 54],  // 39.5°E 15.3°N — dips slightly north
    [260, 60],  // 40.5°E 15.0°N
    [281, 72],  // 41.5°E 14.4°N
    [292, 90],  // 42°E   13.5°N
    [302,110],  // 42.5°E 12.5°N — Eritrea/Djibouti/Ethiopia corner
  ]},

  // ── Eritrea / Djibouti ──────────────────────────────────────────────────────
  { key: "eri-dji", pts: [
    [302,110],  // 42.5°E 12.5°N
    [313,130],  // 43°E   11.5°N — Djibouti/Somalia border begins
  ]},

  // ── Ethiopia / Somalia  (Ogaden — curves east in the middle) ────────────────
  { key: "eth-som", pts: [
    [313,130],  // 43°E   11.5°N — Djibouti tripoint
    [330,152],  // 43.8°E 10.4°N — curves NE into Ogaden
    [350,182],  // 44.9°E  9.0°N — easternmost bulge
    [345,220],  // 44.7°E  7.0°N
    [330,250],  // 43.8°E  5.6°N
    [310,268],  // 42.8°E  4.9°N
    [290,276],  // 41.9°E  4.2°N — Kenya/Ethiopia/Somalia tripoint
  ]},

  // ── Somalia / Kenya  (nearly meridional, lon ~41.5°E) ───────────────────────
  { key: "som-ken", pts: [
    [290,276],  // 41.9°E  4.2°N
    [288,310],  // 41.8°E  2.5°N
    [285,340],  // 41.7°E  1.0°N
    [283,370],  // 41.6°E −0.5°S
    [281,394],  // 41.5°E −1.7°S — coast border at Kiunga/Ras Kamboni
  ]},

  // ── Ethiopia / Kenya  (roughly lat 4–4.5°N, E-W) ───────────────────────────
  { key: "eth-ken", pts: [
    [146,276],  // 35°E   4.2°N — Kenya/Uganda/SS corner
    [188,274],  // 37°E   4.3°N
    [229,274],  // 39°E   4.3°N
    [260,274],  // 40.5°E 4.3°N
    [290,276],  // 41.9°E 4.2°N — Somalia tripoint
  ]},

  // ── Ethiopia / South Sudan  (roughly lon 35°E, N→S) ─────────────────────────
  { key: "eth-ss", pts: [
    [0,   62],  // western map edge ~lat 14.9°N (Sudan/Ethiopia/SS area)
    [80,  98],  // 31.8°E 13.1°N
    [125, 80],  // 34°E   14°N   — Ethiopia/Sudan border jogs east
    [146,120],  // 35°E   12°N
    [146,200],  // 35°E    8°N
    [146,276],  // 35°E    4.2°N — Kenya tripoint
  ]},

  // ── South Sudan / Uganda  (roughly lat 3.5–4°N, E-W) ───────────────────────
  { key: "ss-uga", pts: [
    [0,  270],  // 28°E   4.5°N — western map edge
    [42, 290],  // 30°E   3.5°N
    [80, 284],  // 31.8°E 3.8°N
    [120,280],  // 33.8°E 4.0°N
    [146,276],  // 35°E   4.2°N — Kenya/Ethiopia corner
  ]},

  // ── Kenya / Uganda  (lon ~34–35°E, N→S) ─────────────────────────────────────
  { key: "ken-uga", pts: [
    [146,276],  // 35°E   4.2°N
    [143,295],  // 34.9°E 3.3°N
    [138,320],  // 34.7°E 2.0°N
    [133,345],  // 34.5°E 0.8°N
    [127,365],  // 34.2°E −0.3°S
    [123,380],  // 33.9°E −1.0°S — Lake Victoria / Kenya/Uganda/Tanzania tripoint
  ]},

  // ── Kenya / Tanzania  (diagonal: Lake Victoria SW → Indian Ocean SE) ─────────
  // Coast end is at Lunga Lunga ~(39.5°E, −4.7°S), NOT at −1°S
  { key: "ken-tan", pts: [
    [123,380],  // 33.9°E −1.0°S — Lake Victoria tripoint
    [135,390],  // 34.5°E −1.5°S
    [158,406],  // 35.6°E −2.3°S
    [180,420],  // 36.6°E −3.0°S — Namanga area
    [204,436],  // 37.8°E −3.8°S — Taveta/Kilimanjaro area
    [224,447],  // 38.8°E −4.3°S
    [240,454],  // 39.5°E −4.7°S — Lunga Lunga / Indian Ocean coast
  ]},

  // ── Uganda / Tanzania  (along Lake Victoria S shore, ~lat −1°S) ─────────────
  { key: "uga-tan", pts: [
    [123,380],  // 33.9°E −1.0°S — Kenya tripoint
    [102,382],  // 32.9°E −1.1°S
    [73, 382],  // 31.5°E −1.1°S
    [52, 386],  // 30.5°E −1.3°S — Rwanda/Uganda/Tanzania tripoint
  ]},

  // ── Uganda / Rwanda ──────────────────────────────────────────────────────────
  { key: "uga-rwa", pts: [
    [52, 386],  // 30.5°E −1.3°S — Tanzania tripoint
    [38, 388],  // 29.8°E −1.4°S
    [33, 388],  // 29.6°E −1.4°S — DRC tripoint
  ]},

  // ── Rwanda / Tanzania  (runs S along E Rwanda, lon ~30.5–30.8°E) ────────────
  { key: "rwa-tan", pts: [
    [52, 386],  // 30.5°E −1.3°S — Uganda tripoint
    [54, 402],  // 30.6°E −2.1°S
    [58, 420],  // 30.8°E −3.0°S
    [58, 436],  // 30.8°E −3.8°S
    [56, 446],  // 30.7°E −4.3°S — Burundi tripoint
  ]},

  // ── Rwanda / Burundi ─────────────────────────────────────────────────────────
  { key: "rwa-bur", pts: [
    [56, 446],  // 30.7°E −4.3°S — Tanzania tripoint
    [42, 442],  // 30.0°E −4.1°S
    [25, 440],  // 29.2°E −4.0°S — DRC tripoint
  ]},

  // ── Burundi / Tanzania  (runs S, lon ~30.7°E → Lake Tanganyika) ─────────────
  { key: "bur-tan", pts: [
    [56, 446],  // 30.7°E −4.3°S — Rwanda tripoint
    [58, 462],  // 30.8°E −5.1°S
    [55, 490],  // 30.6°E −6.5°S
    [50, 516],  // 30.3°E −7.8°S
    [44, 530],  // 30.0°E −8.5°S — Lake Tanganyika S end
  ]},
];

// ─── Country label centroids ──────────────────────────────────────────────────
const LABELS: { name: string; x: number; y: number }[] = [
  { name: "ERITREA",    x: 216, y: 36  },
  { name: "DJIBOUTI",   x: 336, y: 152 },
  { name: "ETHIOPIA",   x: 148, y: 186 },
  { name: "S. SUDAN",   x: 50,  y: 228 },
  { name: "SOMALIA",    x: 410, y: 228 },
  { name: "UGANDA",     x: 74,  y: 348 },
  { name: "KENYA",      x: 196, y: 356 },
  { name: "RWANDA",     x: 28,  y: 416 },
  { name: "BURUNDI",    x: 24,  y: 452 },
  { name: "TANZANIA",   x: 152, y: 528 },
];

// ─── Capital amber dots ───────────────────────────────────────────────────────
const CAPITALS = [
  { country: "Kenya",       cx: 183, cy: 356 },
  { country: "Uganda",      cx:  76, cy: 348 },
  { country: "Tanzania",    cx: 152, cy: 500 },
  { country: "Ethiopia",    cx: 150, cy: 192 },
  { country: "Rwanda",      cx:  40, cy: 415 },
  { country: "Burundi",     cx:  38, cy: 448 },
  { country: "Somalia",     cx: 380, cy: 308 },
  { country: "South Sudan", cx:  54, cy: 250 },
  { country: "Eritrea",     cx: 222, cy:  44 },
  { country: "Djibouti",    cx: 322, cy: 144 },
];

// ─── Point-in-polygon ─────────────────────────────────────────────────────────
function inside(px: number, py: number, poly: [number, number][]): boolean {
  let hit = false;
  const n = poly.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const DOTS: { cx: number; cy: number }[] = [];
for (let y = DOT_GAP / 2; y < H; y += DOT_GAP)
  for (let x = DOT_GAP / 2; x < W; x += DOT_GAP)
    if (inside(x, y, POLYGON)) DOTS.push({ cx: x, cy: y });

// ─── SVG ──────────────────────────────────────────────────────────────────────
function EastAfricaMap() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="ea-fade" cx="45%" cy="46%" r="52%">
          <stop offset="10%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="ea-mask">
          <rect x="0" y="0" width={W} height={H} fill="url(#ea-fade)" />
        </mask>
        <filter id="dot-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background dot field */}
      <g mask="url(#ea-mask)">
        {DOTS.map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="1.3" fill="white" opacity="0.18" />
        ))}
      </g>

      {/* Outer boundary */}
      <polygon
        points={POLYGON.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"
      />

      {/* Country border lines */}
      {BORDERS.map(({ key, pts }) => (
        <polyline
          key={key}
          points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Country name labels */}
      {LABELS.map((l) => (
        <text
          key={l.name}
          x={l.x} y={l.y}
          textAnchor="middle"
          fontSize="7"
          fontFamily="system-ui,sans-serif"
          letterSpacing="1.2"
          fill="white"
          opacity="0.38"
          style={{ userSelect: "none" }}
        >
          {l.name}
        </text>
      ))}

      {/* Amber capital dots */}
      {CAPITALS.map((d) => (
        <g key={d.country} filter="url(#dot-glow)">
          <circle cx={d.cx} cy={d.cy} r="9"  fill="none" stroke="#c4763a" strokeWidth="0.7" opacity="0.28" />
          <circle cx={d.cx} cy={d.cy} r="5"  fill="none" stroke="#c4763a" strokeWidth="0.7" opacity="0.5"  />
          <circle cx={d.cx} cy={d.cy} r="3"  fill="#c4763a" opacity="0.95" />
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
      {/* Map background */}
      <div className="absolute inset-0 flex items-center justify-center py-8">
        <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg h-full" style={{ maxHeight: "110%" }}>
          <EastAfricaMap />
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 72% 60% at 50% 50%, transparent 25%, var(--color-forest-deep) 88%)" }}
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

        {/* Logos */}
        <AnimateInGroup className="flex items-center justify-center flex-wrap gap-12 lg:gap-20 mb-14" stagger={0.12}>
          {partners.map((p) => (
            <AnimateInItem key={p.alt}>
              <div className="opacity-60 hover:opacity-95 transition-opacity duration-300">
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height}
                  className="h-10 w-auto object-contain brightness-0 invert" />
              </div>
            </AnimateInItem>
          ))}
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-10 w-24 border border-dashed border-[var(--color-earth)] opacity-20 flex items-center justify-center">
              <span className="text-[9px] tracking-widest uppercase text-[var(--color-sage)]">Partner</span>
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
                <span className="text-[10px] tracking-wide text-[var(--color-sage-light)]">{d.country}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
