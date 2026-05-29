"use client";

import Image from "next/image";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";

// ─── Partner logos ────────────────────────────────────────────────────────────

const partners = [
  { src: "/malana.png", alt: "Malana Research Consult International Ltd.", width: 180, height: 50 },
  { src: "/feasts.png", alt: "Feasts", width: 56, height: 56 },
];

// ─── Map projection ───────────────────────────────────────────────────────────
// ViewBox 0 0 500 620
// x = (lon − 28) × 20.833     lon range 28°E → 52°E
// y = (18 − lat) × 20         lat range 18°N → −12°S

const W = 500;
const H = 620;
const DOT_GAP = 11;

// East Africa outer boundary (clockwise from NW Eritrea)
const POLYGON: [number, number][] = [
  [177, 2],   [219, 0],   [260, 34],  [323, 130], [350, 118],
  [485, 122], [490, 145], [479, 200], [458, 252], [438, 280],
  [370, 315], [296, 385], [252, 416], [244, 440], [238, 466],
  [234, 496], [250, 570], [240, 590], [168, 608], [118, 578],
  [60,  556], [28,  530], [22,  478], [25,  440], [20,  400],
  [44,  338], [50,  296], [2,   278], [0,   162], [105,  90],
  [144,  72], [188,  60], [177,   2],
];

// ─── Internal country borders (approximate polylines) ─────────────────────────
// Each entry is a sequence of [x,y] points tracing a shared border segment.

const BORDER_LINES: { key: string; pts: [number, number][] }[] = [
  // Eritrea / Ethiopia southern border (~lat 15°N, W→E then NE to Red Sea coast)
  { key: "eri-eth",  pts: [[0,60],[90,68],[144,72],[188,60],[220,52],[260,34]] },

  // Eritrea / Djibouti border (~43°E going SE to Gulf of Aden)
  { key: "eri-dji",  pts: [[260,34],[290,80],[302,110]] },

  // Ethiopia / Djibouti border (short, SE corner of Ethiopia)
  { key: "eth-dji",  pts: [[302,110],[313,134]] },

  // Ethiopia / Somalia border (NE diagonal across Ogaden)
  { key: "eth-som",  pts: [[313,134],[338,170],[355,218],[342,268],[290,278]] },

  // Somalia / Kenya border (runs S from Mandera to Kiunga coast)
  { key: "som-ken",  pts: [[290,278],[285,332],[283,392]] },

  // Ethiopia / Kenya border (~lat 4.5°N, runs W→E)
  { key: "eth-ken",  pts: [[146,264],[190,260],[242,260],[290,278]] },

  // Ethiopia / South Sudan border (~lon 35°E, runs N→S)
  { key: "eth-ss",   pts: [[0,60],[80,98],[125,80],[146,120],[146,200],[146,264]] },

  // South Sudan / Uganda & Kenya border (lat ~3.5–4°N)
  { key: "ss-uga",   pts: [[0,270],[52,284],[102,278],[133,272],[146,264]] },

  // Kenya / Uganda border (lon ~34°E, runs N→S)
  { key: "ken-uga",  pts: [[133,272],[130,310],[128,354],[126,378]] },

  // Kenya / Tanzania & Uganda / Tanzania border (lat ~−1°S)
  { key: "ken-tan",  pts: [[56,380],[92,378],[126,378],[183,378],[252,416]] },

  // Uganda / Rwanda junction
  { key: "uga-rwa",  pts: [[56,380],[42,399]] },

  // Rwanda / Burundi border
  { key: "rwa-bur",  pts: [[42,399],[41,429]] },

  // Rwanda / Tanzania eastern border (runs S)
  { key: "rwa-tan",  pts: [[42,399],[50,420],[54,450]] },

  // Burundi / Tanzania eastern border (runs S to Lake Tanganyika area)
  { key: "bur-tan",  pts: [[41,429],[54,450],[52,500],[44,530]] },
];

// Country name label positions (centroid approximations)
const COUNTRY_LABELS: { name: string; x: number; y: number }[] = [
  { name: "ERITREA",   x: 208, y: 36  },
  { name: "DJIBOUTI",  x: 338, y: 154 },
  { name: "ETHIOPIA",  x: 148, y: 178 },
  { name: "S. SUDAN",  x: 50,  y: 228 },
  { name: "SOMALIA",   x: 408, y: 232 },
  { name: "UGANDA",    x: 74,  y: 345 },
  { name: "KENYA",     x: 190, y: 344 },
  { name: "RWANDA",    x: 26,  y: 410 },
  { name: "BURUNDI",   x: 24,  y: 446 },
  { name: "TANZANIA",  x: 148, y: 528 },
];

// Capital amber dots
const CAPITALS = [
  { country: "Kenya",       cx: 183, cy: 386 },
  { country: "Uganda",      cx:  95, cy: 353 },
  { country: "Tanzania",    cx: 161, cy: 483 },
  { country: "Ethiopia",    cx: 224, cy: 179 },
  { country: "Rwanda",      cx:  43, cy: 399 },
  { country: "Burundi",     cx:  41, cy: 429 },
  { country: "Somalia",     cx: 360, cy: 319 },
  { country: "South Sudan", cx:  74, cy: 263 },
  { country: "Eritrea",     cx: 228, cy:  53 },
  { country: "Djibouti",    cx: 316, cy: 128 },
];

// ─── Point-in-polygon (ray casting) ──────────────────────────────────────────

function inside(px: number, py: number, poly: [number, number][]): boolean {
  let hit = false;
  const n = poly.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Pre-compute dot grid
const DOTS: { cx: number; cy: number }[] = [];
for (let y = DOT_GAP / 2; y < H; y += DOT_GAP) {
  for (let x = DOT_GAP / 2; x < W; x += DOT_GAP) {
    if (inside(x, y, POLYGON)) DOTS.push({ cx: x, cy: y });
  }
}

// ─── SVG Map ──────────────────────────────────────────────────────────────────

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

      {/* Background dot field clipped to East Africa shape */}
      <g mask="url(#ea-mask)">
        {DOTS.map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="1.3" fill="white" opacity="0.2" />
        ))}
      </g>

      {/* Outer boundary — very faint */}
      <polygon
        points={POLYGON.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"
      />

      {/* Country border lines */}
      {BORDER_LINES.map(({ key, pts }) => (
        <polyline
          key={key}
          points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="white"
          strokeWidth="0.9"
          opacity="0.28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Country name labels */}
      {COUNTRY_LABELS.map((lbl) => (
        <text
          key={lbl.name}
          x={lbl.x}
          y={lbl.y}
          textAnchor="middle"
          fontSize="7"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1.2"
          fill="white"
          opacity="0.35"
          style={{ userSelect: "none" }}
        >
          {lbl.name}
        </text>
      ))}

      {/* Amber capital dots */}
      {CAPITALS.map((d) => (
        <g key={d.country} filter="url(#dot-glow)">
          <circle cx={d.cx} cy={d.cy} r="9"  fill="none" stroke="#c4763a" strokeWidth="0.7" opacity="0.3" />
          <circle cx={d.cx} cy={d.cy} r="5"  fill="none" stroke="#c4763a" strokeWidth="0.7" opacity="0.5" />
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
