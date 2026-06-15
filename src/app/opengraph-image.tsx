import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Livelihood Lab Africa — Evidence-based research and strategic advisory across Africa";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a3a2a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Subtle grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)",
          }}
        />

        {/* Top-right accent */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          <div style={{ width: 40, height: 2, background: "#c4763a" }} />
          <div
            style={{
              fontSize: 11,
              color: "#4a7c59",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Est. 2023
          </div>
        </div>

        {/* Amber accent line */}
        <div
          style={{
            width: 56,
            height: 3,
            background: "#c4763a",
            marginBottom: 28,
          }}
        />

        {/* Firm name */}
        <div
          style={{
            fontSize: 62,
            color: "#f8f5f0",
            lineHeight: 1.1,
            marginBottom: 20,
            fontWeight: 400,
          }}
        >
          Livelihood Lab Africa
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#6a9c78",
            maxWidth: 680,
            lineHeight: 1.55,
            marginBottom: 48,
          }}
        >
          Evidence-based research, strategic advisory,
          and capacity development across Africa.
        </div>

        {/* Bottom location tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#4a7c59",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Nairobi, Kenya
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#c4763a",
            }}
          />
          <div
            style={{
              fontSize: 12,
              color: "#4a7c59",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            livelihoodlabafrica.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
