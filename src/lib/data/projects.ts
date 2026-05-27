import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "livelihood-diversification-arid-counties",
    title: "Livelihood Diversification Programme — Arid and Semi-Arid Counties",
    sector: "Livelihoods & Food Systems",
    region: "Turkana, Marsabit, Wajir — Kenya",
    client: "International Development Partner",
    duration: "2024 – 2025",
    status: "Completed",
    description:
      "Provided end-to-end MEAL support and evidence generation for a livelihood diversification programme targeting 8,000 households in three arid counties. The assignment included baseline assessments, theory of change development, a midline evaluation, and a final outcome study.",
    outcomes: [
      "Delivered a robust baseline covering 1,600 households across four livelihood typologies",
      "Developed a validated theory of change and performance monitoring framework",
      "Conducted a midline evaluation identifying critical adaptation needs",
      "Produced a final outcome study with policy recommendations for programme scale-up",
    ],
    services: ["MEAL", "Research & Evidence Generation", "Strategic Advisory"],
    featured: true,
  },
  {
    id: "2",
    slug: "youth-employment-systematic-review",
    title: "Youth Employment Evidence Review — Sub-Saharan Africa",
    sector: "Youth & Enterprise Development",
    region: "Sub-Saharan Africa",
    client: "Regional Foundation",
    duration: "2025",
    status: "Completed",
    description:
      "Conducted a rigorous systematic review of youth employment and enterprise development programmes across 14 countries in Sub-Saharan Africa, synthesising evidence from 78 evaluations and studies to inform a new grant strategy.",
    outcomes: [
      "Reviewed and synthesised evidence from 78 programme evaluations and studies",
      "Identified effective programme design features and contextual enablers",
      "Produced a strategic evidence brief to inform a $20 million grant programme",
      "Delivered a stakeholder workshop to validate findings with regional experts",
    ],
    services: ["Systematic Reviews", "Strategic Consulting", "Training"],
    featured: true,
  },
  {
    id: "3",
    slug: "gender-inclusive-agriculture-kenya",
    title: "Gender-Inclusive Agriculture Programme Design — Kenya",
    sector: "Agriculture & Gender",
    region: "Western Kenya",
    client: "National NGO Consortium",
    duration: "2025",
    status: "Active",
    description:
      "Supporting the design of a gender-transformative smallholder agriculture programme targeting 15,000 women farmers in Western Kenya. The assignment includes gender analysis, theory of change facilitation, indicator design, and technical advisory.",
    outcomes: [
      "Completed a gender analysis across five target counties",
      "Facilitated co-design workshops with 120 community stakeholders",
      "Developed a gender-sensitive theory of change and results framework",
      "Providing ongoing technical advisory during programme inception",
    ],
    services: [
      "Gender Equality & Social Inclusion",
      "Strategic Consulting",
      "MEAL",
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "meal-capacity-civil-society-organisations",
    title: "MEAL Capacity Building — Civil Society Organisations",
    sector: "Institutional Strengthening",
    region: "Nairobi, Kenya",
    client: "Donor-Funded Capacity Programme",
    duration: "2024",
    status: "Completed",
    description:
      "Designed and delivered a six-month MEAL capacity building programme for 15 civil society organisations in Kenya, covering research methods, data quality, results reporting, and learning practices.",
    outcomes: [
      "Trained 87 staff from 15 organisations across six intensive workshops",
      "Developed customised MEAL toolkits adopted by 12 of the 15 organisations",
      "Supported three organisations to develop new results frameworks",
      "Post-training assessment showed 40% average improvement in MEAL practice scores",
    ],
    services: [
      "Training & Capacity Development",
      "MEAL",
      "Governance & Institutional Strengthening",
    ],
    featured: false,
  },
];
